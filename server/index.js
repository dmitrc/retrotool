const io = require('socket.io')();
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.dbUrl, { 
    useNewUrlParser: true,
    auth: {
        username: config.dbUser,
        password: config.dbPassword
    }
});

const db = mongoose.connection;

db.on("error", console.error);
db.on("open", () => {
    console.log("connected to db");
});

var itemSchema = new mongoose.Schema({
    title: String,
    date: String,
    likes: [String],
    dislikes: [String],
    owner: String,
    tags: [String],
    actionItem: String,
    notes: [String],
    complete: Boolean,
    pinned: Boolean
});

var Item = mongoose.model("Item", itemSchema);

const log = (...args) => {
    console.log(...args);
}

const getItems = (fn, nest) => {
    const s = nest ? "--> " : "";
    Item.find((err, res) => {
        if (!err && res) {
            log(s + "getItems() - success");
        }
        else {
            log(s + "getItems() - failed");
        }

        fn && fn({
            data: res,
            error: err
        });
    });
}

const getItemsAndBroadcast = () => {
    getItems((res) => {
        io.sockets.emit("items", res);
    }, true);
}


io.on('connection', (socket) => {
    log("connected", socket.id);

    socket.on("echo", (msg) => {
        socket.emit("echo", msg);
    });

    socket.on("getItems", () => {
        getItems((res) => {
            socket.emit("items", res);
        });
    });

    socket.on("addItem", (item) => {
        var newItem = new Item(item);
        newItem.save((err, data) => {
            if (!err && data) {
                log(`addItem() - success`);
                socket.emit("addedItem", data);
                getItemsAndBroadcast();
            }
            else {
                log(`addItem() - failed`);
                console.log(err);
            }
        });
    });

    socket.on("editItem", (id, item) => {
        Item.findByIdAndUpdate(id, { $set: item }, {new: true}, (err, data) => {
            if (!err && data) {
                log(`editItem(${id}) - success`);
                socket.emit("editedItem", data);
                getItemsAndBroadcast();
            }
            else {
                log(`editItem(${id}) - failed`);
            }
        });
    });

    socket.on("likeItem", (id, alias) => {
        Item.findById(id, (err, data) => {
            if (!err && data) {
                const li = data.likes.indexOf(alias);
                const di = data.dislikes.indexOf(alias);

                if (di > -1) {
                    data.dislikes.splice(di, 1);
                }

                if (li > -1) {
                    data.likes.splice(li, 1);
                }
                else {
                    data.likes.push(alias);
                }

                data.save((err) => {
                    if (!err) {
                        log(`likeItem(${id}, ${alias}) - success`);
                        socket.emit("editedItem", data);
                        getItemsAndBroadcast();
                    }
                });
            }
            else {
                log(`likeItem(${id}, ${alias}) - failed`);
            }
        });
    });

    socket.on("dislikeItem", (id, alias) => {
        Item.findById(id, (err, data) => {
            if (!err && data) {
                const li = data.likes.indexOf(alias);
                const di = data.dislikes.indexOf(alias);

                if (li > -1) {
                    data.likes.splice(li, 1);
                }

                if (di > -1) {
                    data.dislikes.splice(di, 1);
                }
                else {
                    data.dislikes.push(alias);
                }

                data.save((err) => {
                    if (!err) {
                        log(`dislikeItem(${id}, ${alias}) - success`);
                        socket.emit("editedItem", data);
                        getItemsAndBroadcast();
                    }
                });
            }
            else {
                log(`dislikeItem(${id}, ${alias}) - failed`);
            }
        });
    });
    
    socket.on("pinItem", (id) => {
        Item.findByIdAndUpdate(id, { $set: { pinned: true} }, {new: true}, (err, data) => {
            if (!err && data) {
                log(`pinItem(${id}) - success`);
                socket.emit("editedItem", data);
                getItemsAndBroadcast();
            }
            else {
                log(`pinItem(${id}) - failed`);
            }
        });
    });
    
    socket.on("unpinItem", (id) => {
        Item.findByIdAndUpdate(id, { $set: { pinned: false} }, {new: true}, (err, data) => {
            if (!err && data) {
                log(`unpinItem(${id}) - success`);
                socket.emit("editedItem", data);
                getItemsAndBroadcast();
            }
            else {
                log(`unpinItem(${id}) - failed`);
            }
        });
    });

    socket.on("completeItem", (id) => {
        Item.findByIdAndUpdate(id, { $set: { complete: true} }, {new: true}, (err, data) => {
            if (!err && data) {
                log(`completeItem(${id}) - success`);
                socket.emit("editedItem", data);
                getItemsAndBroadcast();
            }
            else {
                log(`completeItem(${id}) - failed`);
            }
        });
    });
    
    socket.on("uncompleteItem", (id) => {
        Item.findByIdAndUpdate(id, { $set: { complete: false} }, {new: true}, (err, data) => {
            if (!err && data) {
                log(`uncompleteItem(${id}) - success`);
                socket.emit("editedItem", data);
                getItemsAndBroadcast();
            }
            else {
                log(`uncompleteItem(${id}) - failed`);
            }
        });
    });

    socket.on("deleteItem", (id) => {
        Item.findByIdAndDelete(id, (err, res) => {
            if (!err && res) {
                log(`deleteItem(${id}) - success`);
                socket.emit("deletedItem", id);
                getItemsAndBroadcast();
            }
            else {
                log(`deleteItem(${id}) - failed`);
            }
        });
    }); 
});

io.listen(config.port);
console.log('listening on port ', config.port);
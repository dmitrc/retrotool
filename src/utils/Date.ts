const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const getDate = () => {
    const d = new Date();
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const isValidDate = (s: string) => {
    if (!s || s.length != 8) {
        return false;
    }
    if (months.indexOf(s.substr(0, 3)) == -1) {
        return false;
    }
    if (s[3] != " ") {
        return false;
    }

    const year = parseInt(s.substr(4, 4));
    if (isNaN(year)) {
        return false;
    }
    if (year < 2000 || year > new Date().getFullYear()) {
        return false;
    }
    
    return true;
}
export function toUTCTimeString(date: Date): string {
    return date.getUTCFullYear() + pad10(date.getUTCMonth() + 1) + pad10(date.getUTCDate()) + 'T' + pad10(date.getUTCHours()) + pad10(date.getUTCMinutes()) + pad10(date.getUTCSeconds()) + 'Z';
}

export function toLocalTimeString(date: Date): string {
    return date.getFullYear() + pad10(date.getMonth() + 1) + pad10(date.getDate()) + 'T' + pad10(date.getHours()) + pad10(date.getMinutes());
}

export function pad10(num: number): string {
    return num < 10 ? '0' + num : '' + num;
}

export function atMidnight(date: Date): Date {
    let result = new Date(date);
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
}

export function startOfWeek(date: Date): Date {
    let result = atMidnight(date);
    let day = result.getDay();
    if (day === 1) {
        return result;
    } else {
        let diff = result.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(result.setDate(diff));
    }
}

export function inDays(date: Date, days: number): Date {
    let diff = date.getDate() + days;
    let result = new Date(date)
    result.setDate(diff);
    return result;
}

export function timeDistance(date: Date): string {
    let now = new Date();
    let nowAtMidnight = atMidnight(now);
    let nowAtMonday = startOfWeek(now);
    let then = date.valueOf();
    let thenAtMidnight = atMidnight(date);
    let thenAtMonday = startOfWeek(date);
    let distanceSeconds = Math.abs(then - now.valueOf()) / 1000;
    let distanceDays = Math.round(Math.abs(thenAtMidnight.valueOf() - nowAtMidnight.valueOf()) / 1000 / 86400);
    let distanceWeeks = Math.round(Math.abs(thenAtMonday.valueOf() - nowAtMonday.valueOf()) / 1000 / 604800);
    if (then < inDays(nowAtMidnight, -720).valueOf()) {
        let years = Math.round(distanceSeconds / 31536000);
        return `vor ${years} Jahren`;
    }
    if (then < inDays(nowAtMidnight, -84).valueOf()) {
        let months = Math.round(distanceSeconds / 2592000);
        return `vor ${months} Monaten`;
    }
    if (then < inDays(nowAtMidnight, -21).valueOf()) {
        return `vor ${distanceWeeks} Wochen`;
    }
    if (then < inDays(nowAtMonday, -7).valueOf()) {
        return "vorletzte Woche";
    }
    if (then < nowAtMonday.valueOf() && then < inDays(nowAtMidnight, -2).valueOf()) {
        return "letzte Woche";
    }
    if (then < inDays(nowAtMidnight, -2).valueOf()) {
        return `vor ${distanceDays} Tagen`;
    }
    if (then < inDays(nowAtMidnight, -1).valueOf()) {
        return "vorgestern";
    }
    if (then < nowAtMidnight.valueOf()) {
        return "gestern";
    }
    let hours = Math.floor(distanceSeconds / 3600);
    if (then < now.valueOf() && hours > 2) {
        return "schon vorbei";
    }
    if (then < now.valueOf()) {
        return "hat bereits angefangen";
    }
    if (then > now.valueOf() && hours < 2) {
        return "gleich";
    }
    if (then < inDays(nowAtMidnight, 1).valueOf()) {
        return "heute";
    }
    if (then < inDays(nowAtMidnight, 2).valueOf()) {
        return "morgen";
    }
    if (then < inDays(nowAtMidnight, 3).valueOf()) {
        return "übermorgen";
    }
    if (then < inDays(nowAtMonday, 7).valueOf()) {
        return "diese Woche";
    }
    if (then < inDays(nowAtMonday, 14).valueOf()) {
        return "nächste Woche";
    }
    if (then < inDays(nowAtMonday, 28).valueOf()) {
        return `in ${distanceDays} Tagen`;
    }
    if (then < inDays(nowAtMidnight, 84).valueOf()) {
        return `in ${distanceWeeks} Wochen`;
    }
    if (then < inDays(nowAtMidnight, 720).valueOf()) {
        let months = Math.round(distanceSeconds / 2592000);
        return `in ${months} Monaten`;
    } else {
        let years = Math.round(distanceSeconds / 31536000);
        return `in ${years} Jahren`;
    }
}

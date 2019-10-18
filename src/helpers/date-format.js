export default function FormatDate(isoStr){
    const timeStamp = new Date(isoStr);
    const currentTime = new Date();
    const diff = currentTime.getTime() - timeStamp.getTime()
       
    const diffYears = Math.round(diff / (1000 * 3600 * 24 * 365));
    const diffDays = Math.round(diff / (1000 * 3600 * 24));
    const diffHours = Math.round(diff / (1000 * 3600));
    const diffMinutes = Math.round(diff / (1000 * 60));

    if(diffMinutes < 60){
        return `${diffMinutes}m`;
    } else if(diffHours < 24){
        return `${diffHours}h`;
    } else if(diffDays < 365){
        return `${diffDays}d`;
    } else {
        return `${diffYears}y`;
    }
};

export function FormatYear(isoStr){
    const timeStamp = new Date(isoStr);
    const date = timeStamp.getFullYear();
    return date;
}
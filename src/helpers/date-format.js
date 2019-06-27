export default function FormatDate(isoStr){
    const timeStamp = new Date(isoStr);
    const date = timeStamp.toLocaleString().replace(/\//g, '.');
    return date;
};
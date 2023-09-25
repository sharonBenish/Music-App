export function convertToMinuteDuration(seconds:number){
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = Math.floor(seconds % 60);
    let minuteString = minutes < 10 ? "0" + minutes : minutes;
    let extraSecondString = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    return `${minuteString}:${extraSecondString}`
}
import moment from "moment"


export const formatDate = (dateString: string) => {
    return moment(dateString).format("MMMM Do YYYY")
}
export const formatTime = (timeString: string) => {
    return moment(timeString).format("HH:mm a")
}
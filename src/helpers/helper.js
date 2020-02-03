import { Toast } from 'native-base'
const toastr = (message, type) => {
    Toast.show({
        text: message,
        buttonText: 'Okay',
        type,
    })
}
export { toastr }

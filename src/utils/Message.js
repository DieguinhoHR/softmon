import Swal from 'sweetalert2'

class Message {
  static success(message) {
    Swal.fire(
      'Parabéns!',
      message,
      'success'
    )
  }
}

export default Message

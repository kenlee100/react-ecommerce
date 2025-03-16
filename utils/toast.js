import Swal from 'sweetalert2'

export default Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 1500,
  position: 'top-end',
  didOpen: (toast) => {
    // 直接修改 DOM 樣式
    toast.style.marginTop = '5rem'
  }
})

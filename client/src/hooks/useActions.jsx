import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";
import useMenu from "./useMenu";

const useActions = () => {
  const [, ,  refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleDelete = (item) => {
    Swal.fire({
      title: `Do You Want to delete ${item.name} ?`,
      imageUrl: `${item.image}`,
      imageWidth: 400,
      imageHeight: 200,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete it !!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          console.log("deleted item", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            //alert(`${item.name} has been deleted`)
            let timerInterval;
            Swal.fire({
              position: "top-center",
              title: `${item.name} will delete in <b></b> milliseconds.`,

              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
              showClass: {
                popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `,
              },
              hideClass: {
                popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `,
              },
            });
          }
        });
      }
    });
  };
  return [handleDelete];
};

export default useActions;

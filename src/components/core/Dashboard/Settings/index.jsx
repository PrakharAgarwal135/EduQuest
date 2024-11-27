import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default function index() {
  return (
    <div>
      <h1 className="mb-10 text-3xl font-medium text-white">Edit Profile</h1>

      <ChangeProfilePicture />

      <EditProfile />

      <UpdatePassword />

      <DeleteAccount />
    </div>
  );
}

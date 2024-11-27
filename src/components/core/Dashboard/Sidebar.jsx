import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div class="flex min-h-screen items-center justify-center">
        <h1 class="spinner"></h1>
      </div>
    );
  }

  return (
    <div className="relative flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-screen font-bold bg-richblack-800 py-10">
      {/* mapping on the sidebarLinks to show a single link based on the account type of the user  */}
      <div className="flex relative flex-col text-richblack-25">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}
      </div>

      {/* line in the sidebar  */}
      <div className="mx-auto  mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 "></div>

      {/* settings and logout on sidebar (those will be present on both teacher and student ) */}
      <div className="flex relative flex-col text-white">
        <SidebarLink
          link={{ name: "Settings", path: "dashboard/settings" }}
          iconName={"VscSettingsGear"}
        />
        {/* logout btn (also asking user to confirm the logout)  */}
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are You Sure?",
              text2: "You will be logged out of your Account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="text-sm mt-2 font-medium text-richblack-300"
        >
          <div className="flex text-white ml-8 items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

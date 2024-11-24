import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

import logo from "../../assets/images/main logo.png";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

const NavbarLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Catalog",
    // path: '/catalog',
    // there is no path for catalog bcs we dont want to go anywhere when catalog is clicked
    // instead we want a dropdown menu
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // making api call to backend for showAllCategories bcs we want to show them in catalog
  const fetchSubLinks = async () => {
    setLoading(true);
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(res.data.data);
    } catch (error) {
      console.log("Could not fetch Categories", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* logo  */}
        <Link to={"/"}>
          <img src={logo} alt="logo" width={140} height={25} loading="lazy" />
        </Link>

        {/* nav links  */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {/* we will treat Catalog link differently than others  */}
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className={
                          "group relative flex cursor-pointer items-center gap-1 "
                        }
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        {/* dropdown div  */}
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks && subLinks.length ? (
                            <>
                              {subLinks
                                ?.filter(
                                  (subLink) => subLink?.courses?.length > 0
                                )
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={i}
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // other link except catalog
                    <NavLink
                      to={link?.path}
                      className={({ isActive }) =>
                        isActive ? "text-yellow-25" : "text-richblack-25"
                      }
                    >
                      <p>{link.title}</p>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login / signup / dashboard  */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* if user found and the user is not instructor show cart icon  */}
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* if token is null show login  */}
          {token === null && (
            <Link to="/login">
              <button className="rounded-md border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}

          {/* if token is null show signup  */}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-md border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}

          {/* if token present , then show profile */}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* show navbar icon when md screen  */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

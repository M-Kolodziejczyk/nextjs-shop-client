import { useSession, signOut } from "next-auth/client";

import { Fragment, useEffect, useState, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";

import CartContext from "../../store/cart-context";

const navigation = [
  { name: "Home", href: "/", current: true },
  {
    name: "Carabiners",
    href: "/products/carabiners",
    current: false,
  },
  { name: "Ropes", href: "/products/ropes", current: false },
  {
    name: "Belay Devices",
    href: "/products/belayDevices",
    current: false,
  },
  { name: "Harnesses", href: "/products/harnesses", current: false },
  { name: "Helmets", href: "/products/helmets", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MainNavigation() {
  const cartCtx = useContext(CartContext);
  const [session, loading] = useSession();
  const router = useRouter();
  const category = router.query.category;
  const [navigationState, setNavigationState] = useState(navigation);

  useEffect(() => {
    const newNav = navigation.map((item) => {
      if (item.href === `/climbing-equipment/${category}`) {
        return {
          ...item,
          current: true,
        };
      } else {
        return {
          ...item,
          current: false,
        };
      }
    });
    setNavigationState(newNav);
  }, [category]);

  function logoutHandler() {
    signOut();
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* LOGO */}
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigationState.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href="/cart" passHref>
                  <div className="flex rounded-full cursor-pointer group">
                    <p className="text-gray-300 text-2xl mr-1 group-hover:text-white">
                      {cartCtx.state.cart.length > 0 &&
                        cartCtx.state.cart.length}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 stroke-current text-gray-300 group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </Link>
                {!session && !loading && (
                  <Link href="/login">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white text-md font-medium px-3 py-2 rounded-md">
                      Login
                    </a>
                  </Link>
                )}
                {session && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 stroke-current text-gray-300 hover:text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#d1d5db"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg> */}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link href="/profile">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Your Profile
                            </a>
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={logoutHandler}
                          >
                            Sign out
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default MainNavigation;

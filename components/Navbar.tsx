/* eslint jsx-a11y/click-events-have-key-events: "off" */
/* eslint jsx-a11y/no-static-element-interactions: "off" */
import { useSession } from 'next-auth/react';
import React from 'react';
import NavItem from './NavItem';
import NavItemWithChildren from './NavItemWithChildren';

export default function Navbar({ children }: React.PropsWithChildren<any>) {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const { data: session } = useSession();
  if (!session) {
    return children;
  }
  return (
    <div className="w-full md:flex">
      {showNavbar && (
        <div className="h-screen w-full md:w-1/3 xl:w-1/5 p-3 border-r-2">
          <div className="flex justify-between p-3 items-center">
            <svg
              width="187"
              height="45"
              viewBox="0 0 187 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.0253 7.49828L21.7702 0L0 22.5L21.7702 45L29.0253 37.5016C32.7362 41.2124 37.8183 43.5 43.4238 43.5C54.7877 43.5 64 34.098 64 22.5C64 10.902 54.7877 1.5 43.4238 1.5C37.8183 1.5 32.7362 3.78775 29.0253 7.49828ZM31.8418 10.4092L29.0253 7.49828C25.2131 11.3099 22.8477 16.6231 22.8477 22.5C22.8477 28.377 25.2131 33.69 29.0253 37.5016L31.8418 34.5908C34.8288 37.5717 38.916 39.4091 43.4238 39.4091C52.5741 39.4091 59.9916 31.8387 59.9916 22.5C59.9916 13.1614 52.5741 5.59091 43.4238 5.59091C38.916 5.59091 34.8288 7.42825 31.8418 10.4092ZM31.8418 10.4092L43.5403 22.5L31.8418 34.5908C28.7655 31.521 26.856 27.238 26.856 22.5C26.856 17.762 28.7655 13.4791 31.8418 10.4092Z"
                fill="black"
              />
              <path
                d="M89.386 26.302H83.857L82.907 29H80.646L85.377 15.776H87.885L92.616 29H90.336L89.386 26.302ZM88.778 24.535L86.631 18.398L84.465 24.535H88.778ZM94.101 22.369C94.101 21.077 94.3987 19.918 94.994 18.892C95.602 17.866 96.419 17.068 97.445 16.498C98.4837 15.9153 99.6174 15.624 100.846 15.624C102.252 15.624 103.5 15.9723 104.589 16.669C105.691 17.353 106.489 18.3283 106.983 19.595H104.38C104.038 18.8983 103.563 18.379 102.955 18.037C102.347 17.695 101.644 17.524 100.846 17.524C99.972 17.524 99.193 17.7203 98.509 18.113C97.825 18.5057 97.2867 19.0693 96.894 19.804C96.514 20.5387 96.324 21.3937 96.324 22.369C96.324 23.3443 96.514 24.1993 96.894 24.934C97.2867 25.6687 97.825 26.2387 98.509 26.644C99.193 27.0367 99.972 27.233 100.846 27.233C101.644 27.233 102.347 27.062 102.955 26.72C103.563 26.378 104.038 25.8587 104.38 25.162H106.983C106.489 26.4287 105.691 27.404 104.589 28.088C103.5 28.772 102.252 29.114 100.846 29.114C99.6047 29.114 98.471 28.829 97.445 28.259C96.419 27.6763 95.602 26.872 94.994 25.846C94.3987 24.82 94.101 23.661 94.101 22.369ZM123.576 15.795V29H121.41V19.956L117.382 29H115.881L111.834 19.956V29H109.668V15.795H112.005L116.641 26.15L121.258 15.795H123.576ZM140.893 19.728C140.893 20.3993 140.734 21.0327 140.418 21.628C140.101 22.2233 139.594 22.711 138.898 23.091C138.201 23.4583 137.308 23.642 136.219 23.642H133.825V29H131.659V15.795H136.219C137.232 15.795 138.087 15.9723 138.784 16.327C139.493 16.669 140.019 17.1377 140.361 17.733C140.715 18.3283 140.893 18.9933 140.893 19.728ZM136.219 21.875C137.042 21.875 137.656 21.6913 138.062 21.324C138.467 20.944 138.67 20.412 138.67 19.728C138.67 18.284 137.853 17.562 136.219 17.562H133.825V21.875H136.219ZM147.65 29.171C146.662 29.171 145.769 28.9493 144.971 28.506C144.173 28.05 143.546 27.4167 143.09 26.606C142.634 25.7827 142.406 24.8327 142.406 23.756C142.406 22.692 142.64 21.7483 143.109 20.925C143.577 20.1017 144.217 19.4683 145.028 19.025C145.838 18.5817 146.744 18.36 147.745 18.36C148.745 18.36 149.651 18.5817 150.462 19.025C151.272 19.4683 151.912 20.1017 152.381 20.925C152.849 21.7483 153.084 22.692 153.084 23.756C153.084 24.82 152.843 25.7637 152.362 26.587C151.88 27.4103 151.222 28.05 150.386 28.506C149.562 28.9493 148.65 29.171 147.65 29.171ZM147.65 27.29C148.207 27.29 148.726 27.157 149.208 26.891C149.702 26.625 150.101 26.226 150.405 25.694C150.709 25.162 150.861 24.516 150.861 23.756C150.861 22.996 150.715 22.3563 150.424 21.837C150.132 21.305 149.746 20.906 149.265 20.64C148.783 20.374 148.264 20.241 147.707 20.241C147.149 20.241 146.63 20.374 146.149 20.64C145.68 20.906 145.306 21.305 145.028 21.837C144.749 22.3563 144.61 22.996 144.61 23.756C144.61 24.8833 144.895 25.7573 145.465 26.378C146.047 26.986 146.776 27.29 147.65 27.29ZM157.541 20.051C157.857 19.519 158.275 19.1073 158.795 18.816C159.327 18.512 159.954 18.36 160.676 18.36V20.602H160.125C159.276 20.602 158.63 20.8173 158.187 21.248C157.756 21.6787 157.541 22.426 157.541 23.49V29H155.375V18.531H157.541V20.051ZM165.344 20.298V26.093C165.344 26.4857 165.432 26.7707 165.61 26.948C165.8 27.1127 166.116 27.195 166.56 27.195H167.89V29H166.18C165.204 29 164.457 28.772 163.938 28.316C163.418 27.86 163.159 27.119 163.159 26.093V20.298H161.924V18.531H163.159V15.928H165.344V18.531H167.89V20.298H165.344ZM169.314 23.718C169.314 22.6667 169.529 21.7357 169.96 20.925C170.403 20.1143 170.999 19.4873 171.746 19.044C172.506 18.588 173.342 18.36 174.254 18.36C175.077 18.36 175.793 18.5247 176.401 18.854C177.022 19.1707 177.516 19.5697 177.883 20.051V18.531H180.068V29H177.883V27.442C177.516 27.936 177.015 28.3477 176.382 28.677C175.749 29.0063 175.027 29.171 174.216 29.171C173.317 29.171 172.493 28.943 171.746 28.487C170.999 28.0183 170.403 27.3723 169.96 26.549C169.529 25.713 169.314 24.7693 169.314 23.718ZM177.883 23.756C177.883 23.034 177.731 22.407 177.427 21.875C177.136 21.343 176.749 20.9377 176.268 20.659C175.787 20.3803 175.267 20.241 174.71 20.241C174.153 20.241 173.633 20.3803 173.152 20.659C172.671 20.925 172.278 21.324 171.974 21.856C171.683 22.3753 171.537 22.996 171.537 23.718C171.537 24.44 171.683 25.0733 171.974 25.618C172.278 26.1627 172.671 26.5807 173.152 26.872C173.646 27.1507 174.165 27.29 174.71 27.29C175.267 27.29 175.787 27.1507 176.268 26.872C176.749 26.5933 177.136 26.188 177.427 25.656C177.731 25.1113 177.883 24.478 177.883 23.756ZM185.229 14.94V29H183.063V14.94H185.229Z"
                fill="black"
              />
            </svg>
            <div
              className="text-xl cursor-pointer"
              onClick={() => {
                setShowNavbar((prev) => !prev);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="px-6 my-10">
            <NavItem customClass="text-xl" href="/" title="Home" />
          </div>
          <div className="px-6 my-10 flex flex-col gap-y-2">
            <div className="font-bold text-md text-center md:text-left">Member Tools</div>
            <NavItem href="/events" customClass="text-xl" title="Events" />
            <NavItem href="/opportunities" customClass="text-xl" title="Opportunities" />
            <NavItemWithChildren customClass="text-xl" href="/profile" title="Member Profile">
              <NavItem href="/profile/membership" title="Membership Status" />
              <NavItem href="/profile/attendance" title="Attendance History" />
              <NavItem href="/profile/application" title="Application History" />
              <NavItem href="/profile/resume" title="Resume" />
            </NavItemWithChildren>
            <NavItem href="/settings" customClass="text-xl" title="Account Settings" />
          </div>
          <div className="px-6 my-10 flex flex-col gap-y-2">
            <div className="font-bold text-md text-center md:text-left">Admin Tools</div>
            <NavItem href="/admin/events" customClass="text-xl" title="Manage Events" />
            <NavItem href="/admin/members" customClass="text-xl" title="Manage Members" />
            <NavItemWithChildren
              customClass="text-xl"
              href="/admin/opportunities"
              title="Manage Opportunities"
            >
              <NavItem href="/admin/opportunities/members" title="Manage Members" />
              <NavItem href="/admin/opportunities/programs" title="Manage Programs" />
              <NavItem href="/admin/opportunities/committees" title="Manage Committees" />
            </NavItemWithChildren>
            <NavItem href="/admin/sponsorship" customClass="text-xl" title="Sponsorship tools" />
          </div>
        </div>
      )}
      <div className={`${showNavbar && 'invisible'} md:visible p-3`}>
        {!showNavbar && (
          <div
            className="text-xl cursor-pointer"
            onClick={() => {
              setShowNavbar((prev) => !prev);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

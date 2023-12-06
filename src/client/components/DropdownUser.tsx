import { useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import type { User } from '@wasp/entities'
import { UserMenuItems } from './UserMenuItems';

const DropdownUser = ({ user } : { user: Partial<User> }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <button
        ref={trigger}
        onClick={toggleDropdown}
        className='flex items-center gap-4 duration-300 ease-in-out text-gray-900 hover:text-yellow-500'
      >
        <span className='hidden text-right lg:block'>
          <span className='block text-sm font-medium dark:text-white'>{user?.email?.split('@')[0]}</span>
        </span>
        <CgProfile size='1.1rem' className='ml-1 mt-[0.1rem]' />
        <svg
          className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
          width='12'
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z'
            fill=''
          />
        </svg>
      </button>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <UserMenuItems user={user} />
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;

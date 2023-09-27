'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
// import { Link } from '@nextui-org/link';
import { Image } from '@nextui-org/image';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationPath } from '../../pages/router';

export function Header() {
  const [active, setActive] = useState<string>('home');

  return (
    <Navbar>
      <NavbarBrand>
        <Link to={ApplicationPath.HOME} aria-current="page">
          <Image src="/logo.svg" alt="Logo" width={75} height={75} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        <NavbarItem>
          <Link to={ApplicationPath.HOME} aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={ApplicationPath.LOGIN} aria-current="page">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={ApplicationPath.PROFILE}>Profile</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link to={ApplicationPath.LOGIN}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href={ApplicationPath.REGISTER}
            variant="flat"
            className="rounded-3xl bg-blue-600 text-white"
          >
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

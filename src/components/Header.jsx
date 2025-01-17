"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ href, children, onClick }) => (
    <Link
      href={href}
      className="text-gray-800 hover:text-pink-500 font-medium px-4 py-2 rounded-full hover:bg-pink-50 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg"
              alt="Cosmetic Store"
              width={40}
              height={40}
            />
            <span className="text-2xl font-serif">Cosmetic Store</span>
          </Link>

          {/* Cart & Hamburger */}
          <div className="flex items-center md:hidden">
            {/* Cart Icon */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {/* Cart Badge Example (Uncomment if needed) */}
                {/* <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span> */}
              </Link>
            </Button>

            {/* Hamburger Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="relative left-[14px] mt-5">
                  Menu
                </SheetTitle>
                <SheetDescription>{""}</SheetDescription>
                {/* Accessible DialogTitle */}
                <nav className="flex flex-col space-y-4 mt-4">
                  <NavLink href="/" onClick={toggleMobileMenu}>
                    Home
                  </NavLink>
                  <NavLink href="/shop" onClick={toggleMobileMenu}>
                    Shop
                  </NavLink>
                  {status === "authenticated" ? (
                    <>
                      <NavLink href="/profile" onClick={toggleMobileMenu}>
                        Orders
                      </NavLink>
                      <NavLink href="/profile" onClick={toggleMobileMenu}>
                        Profile
                      </NavLink>
                      <Button
                        onClick={() => {
                          handleLogout();
                          toggleMobileMenu();
                        }}
                        variant="destructive"
                        className="w-full"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      asChild
                      variant="default"
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Link href="/auth/signup" onClick={toggleMobileMenu}>
                        {status === "loading" ? "Loading..." : "Login"}
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </nav>

          {/* Account & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt="User Avatar"
                      />
                      <AvatarFallback>
                        {session.user.name?.[0] || <User />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile/Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="default"
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                <Link href="/auth/signup">
                  {status === "loading" ? "Loading..." : "Login"}
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

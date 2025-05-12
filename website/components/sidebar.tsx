"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"
import { Home, Search, Plus, Heart, User, Menu, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface NavItemProps {
  icon: React.ReactNode
  isActive?: boolean
  isButton?: boolean
  onClick?: () => void
  tooltip: string
}

const NavItem = ({ icon, isActive = false, isButton = false, onClick, tooltip }: NavItemProps) => {
  const isMobile = useIsMobile()
  const baseClasses = cn(
    "flex items-center justify-center transition-colors relative group",
    isActive ? "text-white" : "text-gray-500 hover:text-gray-300",
    isButton ? "bg-zinc-800 rounded-md p-2 md:p-3" : "p-3 md:p-4",
  )

  return (
    <button onClick={onClick} className={baseClasses}>
      {icon}
      <div
        className={cn(
          "absolute bg-zinc-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none",
          isMobile ? "bottom-14 left-1/2 -translate-x-1/2" : "left-16",
        )}
      >
        {tooltip}
      </div>
    </button>
  )
}

interface MenuItemProps {
  label: string
  onClick?: () => void
  hasSubmenu?: boolean
  color?: string
}

const MenuItem = ({ label, onClick, hasSubmenu = false, color = "text-white" }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800 ${color}`}
    >
      <span>{label}</span>
      {hasSubmenu && <ChevronRight className="w-4 h-4" />}
    </button>
  )
}

export function Sidebar() {
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  return (
    <>
      <div className="hidden md:flex fixed left-0 top-0 h-full w-16 flex-col items-center justify-between py-6 bg-black">
        <div className="flex flex-col items-center gap-1">
          <div className="mb-6">
            Logo
          </div>
          <NavItem icon={<Home className="w-6 h-6" />} isActive tooltip="Home" />
          <NavItem icon={<Search className="w-6 h-6" />} tooltip="Search" />
          <NavItem icon={<Plus className="w-6 h-6" />} isButton tooltip="Create" />
          <NavItem icon={<Heart className="w-6 h-6" />} tooltip="Notifications" />
          <NavItem icon={<User className="w-6 h-6" />} tooltip="Profile" />
        </div>
        <div className="relative">
          <NavItem icon={<Menu className="w-6 h-6" />} onClick={toggleMenu} tooltip="Menu" />

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute bottom-0 left-16 w-64 bg-zinc-900 rounded-lg shadow-lg overflow-hidden z-10"
            >
              <div className="flex flex-col">
                <MenuItem label="Appearance" hasSubmenu />
                <MenuItem label="Insights" />
                <MenuItem label="Settings" />
              </div>

              <div className="border-t border-zinc-800 my-1"></div>

              <div className="flex flex-col">
                <MenuItem label="Feeds" hasSubmenu />
                <MenuItem label="Saved" />
                <MenuItem label="Liked" />
              </div>

              <div className="border-t border-zinc-800 my-1"></div>

              <div className="flex flex-col">
                <MenuItem label="Report a problem" />
                <MenuItem label="Log out" color="text-red-500" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around bg-black py-2 border-t border-zinc-800">
        <NavItem icon={<Home className="w-6 h-6" />} isActive tooltip="Home" />
        <NavItem icon={<Search className="w-6 h-6" />} tooltip="Search" />
        <NavItem icon={<Plus className="w-6 h-6" />} isButton tooltip="Create" />
        <NavItem icon={<Heart className="w-6 h-6" />} tooltip="Notifications" />
        <NavItem icon={<User className="w-6 h-6" />} tooltip="Profile" />
      </div>
    </>
  )
}

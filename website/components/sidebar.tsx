"use client";

import { useState } from "react";
import type React from "react";
import {
    Home,
    Search,
    Plus,
    Heart,
    User,
    Menu,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";

interface NavItemProps {
    icon: React.ReactNode;
    isActive?: boolean;
    isButton?: boolean;
    onClick?: () => void;
    tooltip: string;
    as?: React.ElementType;
    asChild?: boolean;
}

const NavItem = ({
    icon,
    isActive = false,
    isButton = false,
    onClick,
    tooltip,
    as: Component = "button",
}: NavItemProps) => {
    const isMobile = useIsMobile();
    const baseClasses = cn(
        "flex items-center justify-center transition-colors relative group",
        isActive ? "text-white" : "text-gray-500 hover:text-gray-300",
        isButton ? "bg-zinc-800 rounded-md p-2 md:p-3" : "p-3 md:p-4"
    );

    return (
        <Component onClick={onClick} className={baseClasses}>
            {icon}
            <div
                className={cn(
                    "absolute bg-zinc-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none",
                    isMobile ? "bottom-14 left-1/2 -translate-x-1/2" : "left-16"
                )}
            >
                {tooltip}
            </div>
        </Component>
    );
};

export function Sidebar() {
    const isMobile = useIsMobile();

    return (
        <>
            <div className="hidden md:flex fixed left-0 top-0 h-full w-16 flex-col items-center justify-between py-6 bg-black">
                <div className="flex flex-col items-center gap-1">
                    <div className="mb-6">Logo</div>
                    <NavItem
                        icon={<Home className="w-6 h-6" />}
                        isActive
                        tooltip="Home"
                    />
                    <NavItem
                        icon={<Search className="w-6 h-6" />}
                        tooltip="Search"
                    />
                    <NavItem
                        icon={<Plus className="w-6 h-6" />}
                        isButton
                        tooltip="Create"
                    />
                    <NavItem
                        icon={<Heart className="w-6 h-6" />}
                        tooltip="Notifications"
                    />
                    <NavItem
                        icon={<User className="w-6 h-6" />}
                        tooltip="Profile"
                    />
                </div>
                <div className="relative">
                    <Menubar className="border-none bg-transparent">
                        <MenubarMenu>
                            <MenubarTrigger className="p-0">
                                <NavItem
                                    icon={<Menu className="w-6 h-6" />}
                                    tooltip="Menu"
                                    asChild
                                />
                            </MenubarTrigger>
                            <MenubarContent className="w-64 bg-zinc-900 border-zinc-800">
                                <div className="flex flex-col">
                                    <MenubarItem className="flex items-center justify-between">
                                        Appearance
                                        <ChevronRight className="w-4 h-4" />
                                    </MenubarItem>
                                    <MenubarItem>Insights</MenubarItem>
                                    <MenubarItem>Settings</MenubarItem>
                                </div>

                                <MenubarSeparator className="bg-zinc-800" />

                                <div className="flex flex-col">
                                    <MenubarItem className="flex items-center justify-between">
                                        Feeds
                                        <ChevronRight className="w-4 h-4" />
                                    </MenubarItem>
                                    <MenubarItem>Saved</MenubarItem>
                                    <MenubarItem>Liked</MenubarItem>
                                </div>

                                <MenubarSeparator className="bg-zinc-800" />

                                <div className="flex flex-col">
                                    <MenubarItem>Report a problem</MenubarItem>
                                    <MenubarItem className="text-red-500">
                                        Log out
                                    </MenubarItem>
                                </div>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around bg-black py-2 border-t border-zinc-800">
                <NavItem
                    icon={<Home className="w-6 h-6" />}
                    isActive
                    tooltip="Home"
                />
                <NavItem
                    icon={<Search className="w-6 h-6" />}
                    tooltip="Search"
                />
                <NavItem
                    icon={<Plus className="w-6 h-6" />}
                    isButton
                    tooltip="Create"
                />
                <NavItem
                    icon={<Heart className="w-6 h-6" />}
                    tooltip="Notifications"
                />
                <NavItem
                    icon={<User className="w-6 h-6" />}
                    tooltip="Profile"
                />
            </div>
        </>
    );
}

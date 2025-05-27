"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FlipVertical2,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users2Icon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
     {
      title: "Dashboard",
      url: "/admin",
      icon: PieChart,
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: SquareTerminal,
    },
    {
      title: "Verticals",
      url: "/admin/verticals",
      icon: FlipVertical2,
      isActive: true,
      items: [
        {
          title: "Vertical Page",
          url: "/admin/verticals/verticalsdisplay",
        },
        {
          title: "All Verticals",
          url: "/admin/verticals/verticaledit",
        },
      ],
    },
    {
      title: "Newsletter",
      url: "/admin/newsletter",
      icon: BookOpen,
      
    },
    {
      title: "Teams",
      url: "/admin/teams",
      icon: Users2Icon,
      isActive: true,
      items: [
        {
          title: "Members",
          url: "/admin/team/members",
        },
        {
          title: "President's Message",
          url: "/admin/team/president",
        },
      ],
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: Settings2,
      
    },
    {
      title: "User Management",
      url: "/admin/usermanagement",
      icon: Settings2,
      
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
      
    },
  ],
  
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

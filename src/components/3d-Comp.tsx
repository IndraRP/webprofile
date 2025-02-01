import { useState } from "react";
import {
  IconBrandLinkedin,
  IconBrandHipchat,
  IconBriefcase,
  IconHome,
  IconCertificate,
  IconDeviceIpadHorizontalCog,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/3d-card";

export function FloatingDockDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home-section",
    },
    {
      title: "Skills",
      icon: (
        <IconDeviceIpadHorizontalCog className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#skills-section",
    },
    {
      title: "Achievment",
      icon: (
        <IconCertificate className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#achievment-section",
    },
    {
      title: "Project",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#project-section",
    },
    {
      title: "Chat",
      icon: (
        <IconBrandHipchat className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://wa.me/6282131211769",
      onClick: openModal, // Pastikan event onClick ada di sini
    },
    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/indra-ridho-rizkian-pratama-298800341/",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full lg:mt-12">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links.map((link) => ({
          ...link,
          onClick: link.onClick || (() => {}), // Pastikan event tetap ada di semua item
        }))}
      />
    </div>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Error Page - Solid SaaS Boilerplate",
  description: "This is Error page for Solid Pro",
  // other metadata
};

export default function ErrorPage() {
  notFound();
};

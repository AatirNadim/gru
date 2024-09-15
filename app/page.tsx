"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Home, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Component from "./image-generator";

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 ease-in-out">
      {/* Sidebar */}
      {/* <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">AI Dashboard</h1>
        </div>
        <nav className="mt-8">
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
      </motion.aside> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className=" dark:bg-gray-800 "
        >
          <div className="flex items-center justify-between p-4 bg-transparent">
            <h2 className="text-4xl font-bold text-primary dark:text-white drop-shadow-lg">
              Gru
            </h2>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isMounted && <Component />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

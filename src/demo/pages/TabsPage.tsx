import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/tabs";
import DashboardLayout from "../layouts/DashboardLayout";
import { Hero } from "../../components/hero";
import { Card, CardBody, CardHeader } from "../../components/card";
import { Input } from "../../components/input";
import { Checkbox, CheckboxGroup } from "../../components/checkbox/checkbox";
import { Icon } from "../../components/icons";

const TabsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-sm font-semibold text-gray-900">Components</p>
        <h1 className="text-3xl font-semibold text-gray-900">Tabs</h1>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        {/* Horizontal Tabs Example */}

        <h2 className="mb-4 text-xl font-semibold text-gray-800">Basic Tabs</h2>

        <Tabs defaultValue="account" orientation="horizontal">
          <TabsList>
            <TabsTrigger value="account">
              <Icon name="user" size={16} className="mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="password">
              <Icon name="lock" size={16} className="mr-2" /> Password
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="settings" size={16} className="mr-2" /> Settings
            </TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card size={"lg"}>
              <CardHeader divider>Account Information</CardHeader>
              <CardBody className="space-y-4">
                <p className="text-gray-700">
                  Manage your account settings and preferences here. You can
                  update your profile information, email address, and other
                  personal details.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Enter your name" />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </CardBody>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card size={"lg"}>
              <CardHeader divider>Password Settings</CardHeader>
              <CardBody className="space-y-4">
                <p className="text-gray-700">
                  Update your password to keep your account secure. Make sure to
                  use a strong password with a mix of letters, numbers, and
                  symbols.
                </p>
                <div className="space-y-3">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </CardBody>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card size={"lg"}>
              <CardHeader divider>General Settings</CardHeader>
              <CardBody className="space-y-4">
                <p className="text-gray-700">
                  Customize your experience with these general settings and
                  preferences.
                </p>
                <CheckboxGroup>
                  <Checkbox
                    value="notifications"
                    label="Enable notifications"
                  />
                  <Checkbox value="autosave" label="Auto-save changes" />
                  <Checkbox value="darkmode" label="Dark mode" />
                </CheckboxGroup>
              </CardBody>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Vertical Tabs Example */}

        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Vertical Tabs
        </h2>

        <Tabs defaultValue="overview" orientation="vertical">
          <div className="flex gap-6">
            <TabsList className="w-48">
              <TabsTrigger value="overview" className="w-full justify-start">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="w-full justify-start">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" className="w-full justify-start">
                Reports
              </TabsTrigger>
              <TabsTrigger value="export" className="w-full justify-start">
                Export
              </TabsTrigger>
            </TabsList>

            <div className="flex-1">
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dashboard Overview
                  </h3>
                  <p className="text-gray-700">
                    Welcome to your dashboard. Here you can see a summary of
                    your recent activity and important metrics at a glance.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        2,543
                      </div>
                      <div className="text-sm text-gray-700">Total Users</div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4">
                      <div className="text-2xl font-bold text-green-600">
                        $12,345
                      </div>
                      <div className="text-sm text-gray-700">Revenue</div>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        89%
                      </div>
                      <div className="text-sm text-gray-700">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-700">
                    Deep dive into your analytics data and track performance
                    metrics over time.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Reports Center
                  </h3>
                  <p className="text-gray-700">
                    Generate and view detailed reports about your business
                    operations.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="export" className="mt-0">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Export Data
                  </h3>
                  <p className="text-gray-700">
                    Export your data in various formats for external analysis or
                    backup.
                  </p>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Controlled Example */}

        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Controlled Tabs
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          Active tab:{" "}
          <span className="font-mono font-semibold text-blue-600">
            {activeTab}
          </span>
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <p className="text-gray-700">
              Controlled account content - state managed externally
            </p>
          </TabsContent>
          <TabsContent value="billing">
            <p className="text-gray-700">
              Controlled billing content - state managed externally
            </p>
          </TabsContent>
          <TabsContent value="notifications">
            <p className="text-gray-700">
              Controlled notifications content - state managed externally
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setActiveTab("account")}
            className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
          >
            External: Account
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
          >
            External: Billing
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
          >
            External: Notifications
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TabsPage;

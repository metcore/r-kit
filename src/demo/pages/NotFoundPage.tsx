import DashboardLayout from '../layouts/DashboardLayout';

export const NotFoundPage = () => {
  return (
    <DashboardLayout>
      <div className="flex h-full items-center justify-center">
        <h1 className="text-7xl font-bold text-gray-800">404</h1>
      </div>
    </DashboardLayout>
  );
};

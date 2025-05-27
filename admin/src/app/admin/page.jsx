// app/page.tsx
import { DashboardCard } from "./components/DashboardCard";
import { EventsChart } from "./components/EventCard";

export default function Page() {
  // Sample data for the chart
  const eventsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Upcoming Events',
        data: [5, 8, 10, 7, 12, 6, 9],
        backgroundColor: '#FFA726',
        borderColor: '#FB8C00',
      },
      {
        label: 'Ongoing Events',
        data: [2, 3, 5, 4, 6, 3, 4],
        backgroundColor: '#66BB6A',
        borderColor: '#43A047',
      },
      {
        label: 'Completed Events',
        data: [8, 10, 12, 15, 18, 20, 22],
        backgroundColor: '#42A5F5',
        borderColor: '#1976D2',
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#0d2137]">Welcome Admin!</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Events Section with Chart */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl text-[#0d2137]">Events Overview</h2>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#FFA726] mr-2"></div>
              <span className="text-sm">Upcoming</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#66BB6A] mr-2"></div>
              <span className="text-sm">Ongoing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#42A5F5] mr-2"></div>
              <span className="text-sm">Completed</span>
            </div>
          </div>
        </div>
        
        {/* Chart Container */}
        <div className="h-80">
          <EventsChart data={eventsData} />
        </div>
        
        {/* Summary Cards below the chart */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <DashboardCard 
            title="Total Upcoming" 
            count={10} 
            trend="up" 
            percentage="12%"
            bgColor="bg-[#FFF3E0]"
            textColor="text-[#FB8C00]"
          />
          <DashboardCard 
            title="Total Ongoing" 
            count={5} 
            trend="steady" 
            percentage="0%"
            bgColor="bg-[#E8F5E9]"
            textColor="text-[#43A047]"
          />
          <DashboardCard 
            title="Total Completed" 
            count={20} 
            trend="up" 
            percentage="8%"
            bgColor="bg-[#E3F2FD]"
            textColor="text-[#1976D2]"
          />
        </div>
      </section>
    </div>
  );
}
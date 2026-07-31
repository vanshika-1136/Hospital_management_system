import {
  Users,
  CalendarDays,
  Clock3,
  CircleCheckBig,
} from "lucide-react";

const DashboardCards = ({ statistics }) => {
  const cards = [
    {
      title: "Total Patients",
      value: statistics.totalPatients,
      icon: <Users size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Today's Appointments",
      value: statistics.todayAppointments,
      icon: <CalendarDays size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Pending Appointments",
      value: statistics.pendingAppointments,
      icon: <Clock3 size={30} />,
      color: "bg-yellow-500",
    },
    {
      title: "Completed Today",
      value: statistics.completedAppointments,
      icon: <CircleCheckBig size={30} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div
              className={`${card.color} w-16 h-16 rounded-xl flex items-center justify-center text-white`}
            >
              {card.icon}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default DashboardCards;
const DashboardCards = ({ statistics }) => {
  const cards = [
    {
      title: "Appointments",
      value: statistics.totalAppointments,
    },
    {
      title: "Prescriptions",
      value: statistics.totalPrescriptions,
    },
    {
      title: "Medical Records",
      value: statistics.totalMedicalRecords,
    },
    {
      title: "Reports",
      value: statistics.totalReports,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <h3 className="text-gray-500">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
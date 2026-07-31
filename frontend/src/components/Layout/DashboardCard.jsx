const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-cyan-500",
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-gray-500 text-sm font-medium">
            {title}
          </h3>

          <h1 className="text-4xl font-bold mt-2 text-gray-800">
            {value}
          </h1>

          {subtitle && (
            <p className="mt-3 text-sm text-gray-400">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;
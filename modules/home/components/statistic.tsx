import { statistics } from "@/common/constant/home";
import { formatNumber } from "@/common/libs/format-currency";
import Container from "@/components/layouts/container";

const Statistic = () => {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center mx-auto w-[280px]"
            >
              <span className="p-5 bg-primary/10 text-primary text-2xl rounded-md">
                {stat.icon}
              </span>
              <div className="flex flex-col ml-3">
                <h3 className="text-2xl font-bold">
                  {`${formatNumber(stat.value)}+`}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistic;

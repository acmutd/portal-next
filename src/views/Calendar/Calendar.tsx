import React from "react";
import { Layout, Calendar, Badge } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import { useHistory } from "react-router-dom";
import "./Calendar.css";
const { Content } = Layout;

interface calendarEvent {
  color: string;
  content: string;
  link?: string;
}

const CalendarPage = () => {
  const history = useHistory();

  const getListData = (value: any) => {
    let listData: calendarEvent[] = [];
    switch (value.year()) {
      case 2021:
        switch (value.month()) {
          case 0:
            switch (value.date()) {
              case 29:
                listData = [
                  {
                    color: "orange",
                    content: "ACM Spring Kickoff",
                    link: "https://acmutd.co",
                  },
                ];
                break;
              default:
            }
            break;
          case 1:
            switch (value.date()) {
              case 12:
                listData = [
                  {
                    color: "purple",
                    content: "Fireside Talks with ACM Development",
                    link: "https://github.com/acmutd",
                  },
                ];
                break;
              default:
            }
            break;
          case 2:
            switch (value.date()) {
              case 5:
                listData = [
                  {
                    color: "purple",
                    content: "Fireside Talks with ACM Development",
                    link: "https://github.com/acmutd",
                  },
                ];
                break;
              case 26:
                listData = [
                  {
                    color: "purple",
                    content: "Fireside Talks with ACM Development",
                    link: "https://github.com/acmutd",
                  },
                ];
                break;
              default:
            }
            break;
          case 3:
            switch (value.date()) {
              case 16:
                listData = [
                  {
                    color: "purple",
                    content: "Fireside Talks with ACM Development",
                    link: "https://github.com/acmutd",
                  },
                ];
                break;
              default:
            }
          default:
        }
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value) as calendarEvent[];
    return (
      <div className="events">
        {listData.map((item: any) => (
          <React.Fragment key={item.content}>
            <a href={item.link} rel="noopener noreferrer" target="_blank">
              <Badge color={item.color} text={item.content} />
            </a>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const getMonthData = (value: any) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: any) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <Layout>
      <Navbar selectedPage="calendar" />

      <Calendar
        style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </Layout>
  );
};

export default CalendarPage;

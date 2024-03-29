import React from "react";
import PersonalSchedulesEditPage from "main/pages/PersonalSchedules/PersonalSchedulesEditPage";

export default {
  title: "pages/PersonalSchedules/PersonalSchedulesEditPage",
  component: PersonalSchedulesEditPage,
};

const Template = () => <PersonalSchedulesEditPage storybook={true} />;

export const Default = Template.bind({});

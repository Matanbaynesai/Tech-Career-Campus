import react, { useState, useEffect} from "react";
import { fetchDailySchedule } from "../../../FetchFunctions/FetchFunctions";
import {WorkWeek,Month,Agenda,Inject,ScheduleComponent,Day,Week,ViewsDirective,ViewDirective} from "@syncfusion/ej2-react-schedule";
import { loadCldr} from "@syncfusion/ej2-base";

//לאדמין תינתן האפשרות לערוך ולשנות כיתות שתפוסות באמצעות שליחת בקשה לדטה בייס
//במקרה שהכיתה תפוסה נשלח פוסט טרו ויזואלית נקבל וי בויו
// לסטודנט תיהיה האפשרות רק לראות
//  טבלה עם מספר הכיתות ושם הכיתות ,תפוסה\זמינה ,ושעות בהן היא תפוסה
//
const ClassScheduleComponent = () => {
  const [myData, setMyData] = useState();

  useEffect(() => {
    fetchDailySchedule().then((response) => setMyData(response));
  }, []);
  console.log(myData);

  loadCldr(
    require("cldr-data/main/he/ca-gregorian.json"),
    require("cldr-data/main/he/numbers.json"),
    require("cldr-data/main/he/timeZoneNames.json")
  );
 

  return (
    <div id="schedule">
      <ScheduleComponent
        locale="he"
        height="500px"
        width="800px"
        enableRtl={true} 
        firstDayOfWorkWeek={0}
      >
            <ViewsDirective>
            <ViewDirective option='Day' displayName="היום"/>
            <ViewDirective option='Week' displayName="שבוע"/>
            <ViewDirective option='WorkWeek' displayName="שבוע עבודה"/>
            <ViewDirective option='Month' displayName="חודש"/>
    </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};
export default ClassScheduleComponent;

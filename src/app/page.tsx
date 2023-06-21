import CompareQueries from "./CompareQueries"
import CreateSchedule from "./CreateSchedule"
import BulkCreateSchedule from "./BulkCreateSchedule"
import Container from "./Container"
import ViewCurrentUser from "./ViewCurrentUser"

export default function Home() {
  return (
    <Container>
      <ViewCurrentUser />
      <CreateSchedule />
      <BulkCreateSchedule />
      <CompareQueries />
    </Container>
  )
}

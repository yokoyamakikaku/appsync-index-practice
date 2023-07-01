import Container from "../Container"
import CreateSchedule from "./CreateSchedule"
import BulkCreateSchedule from "./BulkCreateSchedule"

export default function New() {
  return (
    <Container>
      <CreateSchedule />
      <BulkCreateSchedule />
    </Container>
  )
}

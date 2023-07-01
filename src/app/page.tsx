import Container from "./Container"
import CompareQueries from "./CompareQueries"
import ViewCurrentUser from "./ViewCurrentUser"

export default function Home() {
  return (
    <Container>
      <ViewCurrentUser />
      <CompareQueries />
    </Container>
  )
}

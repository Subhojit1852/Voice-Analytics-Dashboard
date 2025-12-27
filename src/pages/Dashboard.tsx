import { Container, Typography } from "@mui/material";
import AgentSuccessChart from "../charts/AgentSuccessChart";
import AvgCallDurationChart from "../charts/AvgCallDurationChart";
import CallVolumeChart from "./CallVolumeCharts";
import Footer from "../components/footer";

export default function Dashboard() {
  return (
    <>
    <Container className="mt-4">
      <Typography variant="h4" gutterBottom>
        Voice Analytics Dashboard
      </Typography>

      <Typography variant="body2" color="gray" mb={4}>
        Operational insights for voice-based customer support teams
      </Typography>

      <div className="row g-4">
        <div className="col-12">
          <CallVolumeChart />
        </div>

        <div className="col-md-6">
          <AgentSuccessChart />
        </div>

        <div className="col-md-6">
          <AvgCallDurationChart />
        </div>
      </div>
    </Container>
     <Footer />
     </>
  );
}

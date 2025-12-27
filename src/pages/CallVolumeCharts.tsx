import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import EmailModal from "../components/EmailModal";
import { supabase } from "../lib/supabase";
import OverwriteModal from "../components/OverwriteModal";

const defaultData = [
  { day: "Mon", calls: 120 },
  { day: "Tue", calls: 200 },
  { day: "Wed", calls: 150 },
  { day: "Thu", calls: 280 },
  { day: "Fri", calls: 220 },
];

export default function CallVolumeChart() {
  const [data, setData] = useState(defaultData);
  const [editData, setEditData] = useState(defaultData);

  const [emailModal, setEmailModal] = useState(false);
  const [overwriteModal, setOverwriteModal] = useState(false);

  const [email, setEmail] = useState("");
  const [existingData, setExistingData] = useState<any>(null);

  const handleEmailSubmit = async (email: string) => {
    setEmail(email);
    setEmailModal(false);

    const { data: row } = await supabase
      .from("analytics_data")
      .select("chart_data")
      .eq("email", email)
      .single();

    if (row) {
      setExistingData(row.chart_data);
      setOverwriteModal(true);
    } else {
      saveData(email);
    }
  };

  const saveData = async (email: string) => {
    await supabase.from("analytics_data").upsert({
      email,
      chart_data: editData,
    });

    setData(editData);
    setOverwriteModal(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Call Volume (Editable)
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <Stack direction="row" spacing={2} mt={3}>
          {editData.map((item, idx) => (
            <TextField
              key={item.day}
              label={item.day}
              type="number"
              size="small"
              value={item.calls}
             onChange={(e) => {
  const value = Number(e.target.value);

  setEditData((prev) =>
    prev.map((item, i) =>
      i === idx ? { ...item, calls: value } : item
    )
  );
}}

            />
          ))}
        </Stack>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => setEmailModal(true)}
        >
          Save Changes
        </Button>

        <EmailModal
          open={emailModal}
          onClose={() => setEmailModal(false)}
          onSubmit={handleEmailSubmit}
        />

        <OverwriteModal
          open={overwriteModal}
          previousData={existingData}
          onCancel={() => setOverwriteModal(false)}
          onConfirm={() => saveData(email)}
        />
      </CardContent>
    </Card>
  );
}

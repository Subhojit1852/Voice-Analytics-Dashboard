import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import EmailModal from "../components/EmailModal";
import OverwriteModal from "../components/OverwriteModal";
import { supabase } from "../lib/supabase";

type EditRow = {
  day: string;
  calls: string; // 👈 string, not number
};
const defaultData = [
  { day: "Mon", calls: "120" },
  { day: "Tue", calls: "200" },
  { day: "Wed", calls: "150" },
  { day: "Thu", calls: "280" },
  { day: "Fri", calls: "220" },
];

export default function CallVolumeChart() {
  const [data, setData] = useState<any[] | null>(null);


const [editData, setEditData] = useState<EditRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [emailModal, setEmailModal] = useState(false);
  const [overwriteModal, setOverwriteModal] = useState(false);

  const [email, setEmail] = useState("");
  const [existingData, setExistingData] = useState<any>(null);

  // 🔥 FETCH DATA ON PAGE LOAD
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("analytics_data")
        .select("chart_data")
        .limit(1)
        .single();

      if (!error && data?.chart_data) {
        setData(data.chart_data);
        setEditData(data.chart_data);
      } else {
        // fallback only if DB is empty
        setData(defaultData);
        setEditData(defaultData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

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

    // sync UI with saved data
    setData(editData);
    setOverwriteModal(false);
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Call Volume (Editable)
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data ?? []}>
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
  const value = e.target.value; // keep as string
  setEditData(prev =>
    prev.map((row, i) =>
      i === idx ? { ...row, calls: value } : row
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

import WebhooksPage from "@/features/api/WebhooksPage";
import { SettingsTabs } from "./_SettingsLayout";
export default function WebhooksSettingsPage() {
  return <SettingsTabs title="Webhooks"><WebhooksPage embedded /></SettingsTabs>;
}

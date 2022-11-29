import AppStatistics from "../../sections/AppStatistics";
const data=[
    {
        name:'Customer Satisfaction Rate',
        value: '87%',
    },
    {
        name:'Customer Retention Rate',
        value: '42%',
    },
    {
        name:'Average Promotion Rate',
        value: '5%',
    },
    {
        name:'Ordering Trends (past 3 days)',
        value: '+300%',
    }
]

export default function CampaignStatistics() {
  return (
    <AppStatistics
        title="Statistics"
        list={data}
    />
  );
}
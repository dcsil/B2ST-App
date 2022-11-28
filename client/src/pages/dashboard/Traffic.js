import AppPieChart from "../../sections/AppPieChart";
const data=[
    {
        label:'IOS',
        value:535
    },
    {
        label:'Android',
        value: 773
    },
    {
        label:'Desktop',
        value: 100
    },
    {
        label:'Tablet',
        value: 100
    }
]

export default function Traffic() {
    // write fetch request here
    return (
        <AppPieChart
            title="Traffic by Device"
            chartData={data}
        />
    );
}
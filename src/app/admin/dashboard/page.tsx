import { getRequests } from "@/app/functions/requests";
import Card from "@/components/atoms/Card";
import RequestButtons from "@/components/molecules/RequestButtons";

type RequestType = {
  request_id: string;
  company_id: string;
  user_id: string;
  service_id: string;
  company_name: string;
  user_name: string;
  service_name: string;
};

type FormattedUserRequests = {
  userId: string;
  userName: string;
  companies: Record<string, string[]>;
};

function formatRequestsByUser(rows: RequestType[]): FormattedUserRequests[] {
  const users: Record<string, FormattedUserRequests> = {};

  for (const row of rows) {
    if (!users[row.user_id]) {
      users[row.user_id] = {
        userId: row.user_id,
        userName: row.user_name,
        companies: {},
      };
    }

    if (!users[row.user_id].companies[row.company_id]) {
      users[row.user_id].companies[row.company_id] = [];
    }

    users[row.user_id].companies[row.company_id].push(row.service_id);
  }

  return Object.values(users);
}

export default async function Page() {
  const requests = await getRequests();
  const companyMap = new Map<string, string>();

  requests.forEach(({ company_id, company_name }) => {
    companyMap.set(String(company_id), company_name);
  });

  const serviceMap = new Map<string, string>();

  requests.forEach(({ service_id, service_name }) => {
    serviceMap.set(service_id, service_name);
  });

  const formattedRequests = formatRequestsByUser(requests);

  return (
    <div className="bg-white p-3 h-screen rounded-b-xl min-h-fit">
      {formattedRequests.map((user) => (
        <div
          key={user.userId}
          className="bg-sent-gray p-4 rounded-xl flex flex-col gap-2 mb-4 min-h-fit"
        >
          <Card title={user.userName} width="xl" height="sm">
            <div className="flex flex-col gap-3 h-fit">
              {Object.entries(user.companies).map(([company, services]) => (
                <div
                  key={company}
                  className="pl-4 bg-sent-gray/80 p-4 rounded-xl h-full min-h-fit"
                >
                  <h3 className="font-semibold text-xl">
                    {companyMap.get(company) + ":"}
                  </h3>
                  <ul className="pl-5 pt-2 flex flex-row gap-2">
                    {services.map((service) => (
                      <li
                        key={service}
                        className="bg-sent-purple p-2 rounded-lg text-white "
                      >
                        {serviceMap.get(service)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex flex-row w-full justify-end gap-4">
            <RequestButtons
              companies={user.companies}
              user_id={user.userId}
            ></RequestButtons>
          </div>
        </div>
      ))}
    </div>
  );
}

import ContainerBalanceCard from "./ContainerBalanceCard";
import { Spinner } from "reactstrap";

export default function BalanceCard({ component, title }) {
  const { props } = component;

  return (
    <ContainerBalanceCard>
      <div>
        {props.data.length !== 0 ? (
          component
        ) : (
          <div
            style={{ width: "100%", height: "100%",  display: "grid", placeContent: "center" }}
          >
          { component}
          </div>
        )}

      
      </div>
    </ContainerBalanceCard>
  );
}

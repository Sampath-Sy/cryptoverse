import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { exchangesList } from "./mockData";
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  // Note: To access this endpoint you need premium plan
  const { data, isFetching } = useGetExchangesQuery();
  // const exchangesList = exchangesList;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{marginBottom:'1rem'}}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;

import { Col, Container, Row } from 'reactstrap';

const AboutUs = () => {
    return <>
        <section>
            <Container>
                <Row className="mb-5">
                    <Col lg="8">
                        <p>At <b>Travel World</b>, we believe that every journey is a story waiting to be told. We are thrilled to be your trusted partner in curating unforgettable tours and adventures to a myriad of breathtaking destinations. Whether you're a curious explorer, an avid adventurer, or someone seeking a tranquil escape, we're here to transform your travel dreams into reality.</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8">
                        <b>Why Choose Us?</b><br /><br />

                        <div className="gap-y-3">
                            <p><b>Tailored Experiences:</b> We understand that each traveler is unique, and that's why we offer tailor-made tours designed to match your preferences, interests, and schedule. Our expert team works tirelessly to craft journeys that align with your desires, ensuring every moment is enriching and enjoyable.<br /></p>

                            <p><b>Diverse Destinations:</b> From sun-kissed beaches to rugged mountain landscapes, bustling city streets to serene countryside retreats, we have a wide array of destinations for you to choose from. Explore our carefully curated selection of locales, each offering its own charm and allure.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
}

export default AboutUs;
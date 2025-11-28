import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardBody, CardHeader } from "../../components/card";

function HomePage() {
  return (
    <DashboardLayout>
      <div>HomePage</div>
      <div>
        <Card size={"lg"}>
          <CardHeader divider>Header</CardHeader>
          <CardBody>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis fuga molestiae iusto corporis velit! Placeat, facere
              laborum repudiandae suscipit nam explicabo eveniet veritatis
              impedit eos omnis similique sint ipsum adipisci quo blanditiis
              assumenda nulla libero laudantium quam dolore minima dolorum, sunt
              aliquid inventore? Illum consequuntur in nemo aperiam
              necessitatibus vero corrupti rem dolore? Temporibus ratione
              blanditiis voluptas natus in eum veniam ex vero iusto quas nemo
              quidem quae illo, enim non! Autem, saepe commodi. Dolore libero
              ullam aspernatur, distinctio voluptatibus perferendis tenetur non
              debitis numquam excepturi consequatur eligendi facere quod. Est
              nesciunt exercitationem autem earum distinctio assumenda impedit
              quasi ea.
            </div>
          </CardBody>
        </Card>
        <div className="py-24">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ea
          corrupti voluptas eius recusandae enim quas, amet repudiandae.
          Molestias dignissimos mollitia, atque harum exercitationem quas optio
          illo autem laudantium voluptate?
        </div>
        <div className="py-24">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ea
          corrupti voluptas eius recusandae enim quas, amet repudiandae.
          Molestias dignissimos mollitia, atque harum exercitationem quas optio
          illo autem laudantium voluptate?
        </div>
        <div className="py-24">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ea
          corrupti voluptas eius recusandae enim quas, amet repudiandae.
          Molestias dignissimos mollitia, atque harum exercitationem quas optio
          illo autem laudantium voluptate?
        </div>
        <div className="py-24">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ea
          corrupti voluptas eius recusandae enim quas, amet repudiandae.
          Molestias dignissimos mollitia, atque harum exercitationem quas optio
          illo autem laudantium voluptate?
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HomePage;

import * as React from "react";
import Input from "Core/Input";
import Style from "../../Sass/Component/_form.module.scss";
import Button from "Core/Button";
import Grid from "Core/Grid";
import DatePicker from "Core/DatePicker";

interface FormProps {
  handleData: (data: { [name: string]: string | number }) => void;
}

interface FormState {
  data: {
    [name: string]: string | number;
  };
}

class FormComponent extends React.Component<FormProps, FormState> {
  state: FormState = {
    data: {
      dob: new Date(1998, 0, 20).getTime(),
    },
  };

  handleOnchange(name: string, value: string | number) {
    try {
      const { data } = this.state;
      data[name] = value;
      console.debug("FormComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`FormComponent execute handleOnchange ${error.toString()}`);
    }
  }

  handleSubmit() {
    this.props.handleData(this.state.data);
  }
  render() {
    return (
      <div className={Style["form--container"]}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ex alias sint praesentium nam iste laboriosam labore minus, assumenda ad, eaque placeat quisquam inventore commodi eius. Recusandae in molestias repellendus incidunt, iusto, quaerat ipsum maxime officia hic quis unde. Et repellat similique vitae! Perspiciatis perferendis inventore quas vitae deserunt doloremque hic porro quo eius! Temporibus, at doloremque! Ipsa provident corporis voluptates sint temporibus, minima hic quas consectetur, repudiandae facilis, accusantium ad commodi fuga quod! Exercitationem perferendis ducimus blanditiis asperiores magnam soluta accusantium itaque dignissimos sed! Eum, neque quia. Dolorum repellat corrupti a amet quos! Repellat, expedita voluptas adipisci explicabo, doloremque maxime laboriosam eligendi dolor, earum iure sunt itaque nihil quas! Aut officiis deserunt dignissimos, maiores ea perspiciatis nemo vitae eligendi, inventore voluptate dolorum facilis non quisquam iusto eveniet doloribus dolorem eos harum tenetur! Architecto harum fugiat deleniti dolore cumque animi maxime beatae voluptates expedita nemo? Adipisci optio a tempore voluptate vel eius ipsum magni accusamus dignissimos, quidem consequatur pariatur, rerum obcaecati, est ea expedita sapiente. Fuga aliquid nisi incidunt. Numquam a ducimus ipsa commodi. Quo laborum, officiis ducimus tempore quidem tempora illo nulla veritatis, reprehenderit vel ad rerum dolorem ut quaerat fugiat saepe blanditiis voluptatibus repellendus nostrum ullam perspiciatis. Sint facere incidunt laudantium sed ducimus. Iusto a aspernatur quidem cum numquam ea unde eos maiores, rem doloremque dolores asperiores officia qui recusandae nulla molestias! Repellat mollitia eos nam. Repudiandae voluptate accusamus laboriosam repellat culpa, atque explicabo magnam consectetur corrupti natus velit asperiores illum dignissimos ratione eligendi temporibus. Quam animi harum, enim eos et, iure veniam eveniet nulla rem ipsa eum quaerat dolorum? Repudiandae sed distinctio, dolores nihil voluptas tenetur et, exercitationem aperiam eius sequi impedit a reiciendis vitae voluptate veniam, ipsam dicta ipsum unde alias ducimus mollitia consectetur? Corrupti nobis vero non voluptatem optio iste, enim ipsa dignissimos amet odit nihil dolorum autem repudiandae ullam, eius esse quasi sint vitae officiis in. Est ducimus aut facere dicta soluta neque. Perspiciatis ut animi veniam corporis, fugit nostrum nihil. Placeat, ipsam provident incidunt eius doloremque vero? Voluptas dolor, deserunt quo hic ea ratione debitis sint beatae vel corrupti voluptates magnam rerum sequi illum accusamus architecto. Ducimus repudiandae animi quod distinctio ab nulla! Quo neque voluptates, recusandae repellat eligendi sit. Saepe, sapiente error corrupti quisquam perferendis molestiae ipsum dolores illum omnis temporibus autem exercitationem voluptatem at facere repellendus rem fuga? Reprehenderit ducimus doloribus corporis perferendis pariatur vitae enim alias repellat voluptas hic minima, cupiditate ipsum quia ad dicta velit. Eaque labore accusantium minus voluptas voluptate fugiat aliquid, nobis, eum sapiente doloribus similique ipsa quidem officiis cum modi voluptatibus nam quaerat quasi beatae corporis dolor porro? Error inventore officia at neque explicabo dolorem voluptas quam doloremque. Dolorem, soluta veritatis amet dicta, odit velit reprehenderit praesentium, mollitia est aspernatur optio porro commodi qui maiores unde consequuntur cumque temporibus. Dolores qui ipsa perspiciatis, ut, mollitia at excepturi quod commodi, sequi labore ea minus magni dignissimos reiciendis nobis facilis nulla perferendis non. Nesciunt ducimus commodi consequuntur omnis excepturi earum magnam adipisci nemo, aliquid animi fugiat, possimus cum pariatur inventore maiores in tempora eaque blanditiis? Earum, rerum harum corporis commodi adipisci dolorum quis sed consequatur perspiciatis reprehenderit. Similique accusamus eligendi nemo vel laboriosam, quaerat eos voluptatibus dignissimos odit alias rem hic praesentium error sit mollitia nisi, velit, ratione beatae nulla nihil voluptas illo placeat? Sit suscipit enim quod quaerat dolorum beatae ipsa error aspernatur ducimus inventore. Voluptatum eos illo et architecto, voluptates vitae id vel mollitia rerum iste nam quisquam inventore natus dolorum nobis ut maxime quasi rem iusto placeat repellat doloribus. Quibusdam quae, cumque modi sequi corrupti iste vitae et sed in impedit sint nobis ullam porro quos quis ipsum amet ab qui alias nulla tempora suscipit. Odio molestias officiis quisquam voluptatem culpa? Culpa esse consectetur, porro veniam veritatis vero officia fuga cumque ea facere adipisci reprehenderit inventore autem ipsa amet id sint facilis! Pariatur natus ullam, incidunt quae quas nulla eveniet labore assumenda. Sequi animi rerum deleniti, nam nobis ut culpa facere explicabo, iusto modi ab perferendis sit laudantium repudiandae temporibus, quia nihil delectus provident! Exercitationem in rerum blanditiis. Quae accusantium quas, nisi illum earum hic et harum corrupti asperiores cupiditate doloremque, exercitationem eos libero officia rerum ea, ullam alias assumenda sapiente adipisci accusamus quod. Quos dolore praesentium illum rem deserunt, qui possimus iusto asperiores nostrum architecto tempora accusantium libero impedit ipsam totam illo eaque id. Consequatur, vel distinctio minima facilis molestiae adipisci id! Iure ratione fuga ipsum dolores eius voluptatibus ipsa maxime, id, libero pariatur similique excepturi vitae cupiditate architecto deserunt quibusdam sunt. Explicabo voluptatem natus modi mollitia esse alias fuga, architecto earum totam ipsum, qui sunt tempore, commodi ex voluptatibus ullam facere rem. Praesentium nostrum illum quam perspiciatis fugit, mollitia molestias assumenda esse accusantium dicta neque error numquam quasi! Unde error quia deserunt fugit quis dolore? Officia velit repellat possimus autem blanditiis molestias ipsum temporibus veritatis, nam sapiente in corrupti dolores quam, optio vero ad. Porro deserunt ea voluptatum debitis ipsa odio est accusamus ipsum dolor iusto similique necessitatibus esse quasi, laboriosam delectus sit provident voluptate vitae, ratione repellat facere fugiat repellendus? Molestiae enim dolores et exercitationem debitis totam rem eaque possimus vero aspernatur iure velit eos nemo, itaque sunt, veniam similique accusamus obcaecati ducimus! Doloremque vel natus recusandae iste excepturi animi asperiores suscipit aliquam officiis iure tempore, soluta similique voluptates nisi, repellendus ratione qui. Id, expedita minus consectetur dolores neque at similique ipsam asperiores dolore fugit ipsa amet, quae reprehenderit doloremque tempora impedit beatae possimus, consequatur mollitia maxime nam libero odit. Hic voluptatibus fuga eum eos illo repellat. Assumenda omnis optio error aliquid excepturi explicabo maxime, aperiam eaque, adipisci facere incidunt debitis veritatis dicta unde id deleniti nesciunt voluptate, deserunt eligendi iusto porro? Facilis, corrupti. Maxime eum vitae unde qui esse totam fugiat non veritatis animi neque accusamus harum voluptate facere consequuntur doloribus deleniti nostrum delectus magni tempora inventore, fuga sunt nam? Ea facilis, quo aliquam mollitia quisquam error. Quos nam consequatur consectetur doloremque, minima amet, possimus saepe, laboriosam eveniet maiores magni quasi ab. Consectetur corrupti id quasi delectus quaerat. Debitis, eligendi aliquid!</p>
        <h3 className={Style["title--h3"]}>Form</h3>
        <form action="submit">
          <Input label="Họ tên" onChange={this.handleOnchange.bind(this)} name="name" />
          <Grid gap={1}>
            <Grid item>
              <Input label="Email" onChange={this.handleOnchange.bind(this)} name="email" />
            </Grid>
            <Grid item>
              <Input label="Phone" onChange={this.handleOnchange.bind(this)} name="phone" />
            </Grid>
          </Grid>
          <DatePicker defaultValue={new Date(1998, 0, 20).getTime()} label="Ngày sinh" onChange={this.handleOnchange.bind(this)} name="dob" />
          <Button className="mt-1" content={"Lưu"} onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}

export default FormComponent;

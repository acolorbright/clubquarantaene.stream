<template>
  <div class="bathroom">
    <div class="bathroom-cubicles">
      <div
        class="bathroom-cubicles-item"
        v-for="(cubicle, index) in images"
        :key="index"
        @click="handleClick(index)"
      >
        <span>{{ index + 1 }}</span>
        <figure class="bathroom-cubicles-item-hoverimage">
          <img :src="images[index]" />
        </figure>
        <figure class="background-image">
          <img src="~/assets/images/cubicle.png" />
        </figure>
      </div>
      <div class="bathroom-cubicles-item bathroom-cubicles-warning">
        Max. 8 People per Cubicle
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  data() {
    return {
      images: [
        'https://www.picclickimg.com/d/w1600/pict/112368217117_/Goldene-Toilette-Exklusiv-Luxus-Gold-WC-Klo-Stand.jpg',
        'https://i.ebayimg.com/images/g/kFAAAOSwSS1chWA1/s-l640.jpg',
        'https://i.ebayimg.com/images/g/FIYAAOSwLtZdqUjy/s-l640.jpg',
        'https://img.buzzfeed.com/buzzfeed-static/static/2014-02/enhanced/webdr02/22/12/enhanced-26877-1393089559-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
        'https://66.media.tumblr.com/512cfaa322231b321173f1ca11e1e50f/tumblr_nkqluupk771qj185so3_500.jpg',
        // 'https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/e9ob3rjlcq9n34hc1aqx.jpg',
        'https://img.buzzfeed.com/buzzfeed-static/static/enhanced/terminal01/2009/6/19/12/enhanced-buzz-18165-1245428348-10.jpg',
        'https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/h9nta16xjuzezxeoovxn.jpg',
        'https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/jzy6xyjkrhlhsppsdr0b.jpg',
        'https://images.complex.com/complex/image/upload/c_fill,dpr_auto,q_90,w_920/fl_lossy,pg_1/bfrbbf40vsp1nnue4kdz.jpg',
        'https://i.pinimg.com/564x/5e/3c/5b/5e3c5b8db575dacf0a16bc429cbae858.jpg',
        // 'https://i.pinimg.com/564x/5e/a1/29/5ea129cb6d2446320ff3ed23547462ac.jpg',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUXFxoYGBgYFRcXFxsYFxoWFhgYGhcYHSggGBolHR0YITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQFy0dHx4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSsrLS0tLS0tLS0tLS0tLS0tK//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABAEAABAwIEAwYEAwYFAwUAAAABAAIRAyEEEjFBBVFhInGBkaGxBhPB8DJC0RQjUmJy4QczgrLxFpLSJDRDY3P/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAoEQEBAAICAgEDAgcAAAAAAAAAAQIRITEDQRIEUbETgTJCUmGRodH/2gAMAwEAAhEDEQA/AGLxdR1GqWqFw5cToC1QhHo2oLIKoEWDuMFWTCVczB3KuVQm3CahNOBqCkyNEPxC391m/gcHesH3UNL6/ojsdSLmOaYuCPNBYRv7thG7fXdNgGYyg4phwF8Oe3rI/wBV/eUFRU+DqRWH8zY8j/dORZ6LJKkrzsbk/wDK5wuikrm1hJlSy5p8ERzlrjm6iBoBEjrN79UJkmqTsGtHi0uP19FI2o8MfMWiIvbnfrK5wjbnSCOvPqhOjTsQ6qBFxJ59FDQcM7o3a0/7h+iC4oJeybalsdAJ+ilwJPzYBt8v2d/dDfKtnCfH4Rrm2AkmP+4ht/vYKqYyiWVA9hLXA25hwvPnaFeCyfAqDE4GnUu5oJ57+YQyx2bx+T48XoTwviYxFFlQi+VzHN/miXDutboQu6roLhpLddgYAH0QeAw7KUhswXAne92+xPkEbVfBEj9JtCbfCGUkvDuhhW4im0l5AEOtbMY3GyU1N07pPiY1OqT4wQ4qmNSyVLin+cT/AC/WPqoKAio7rB9IU3FyRWtu0+7UFhifmOB2jkmy6CJeJk9n+ofRCY6m+eyYabE7gmIcbyY5dURxiplbm5QUK/iFMNnMTmvba2t9EPH02Y+jRc1rcxBMX/tKMottKCo4xjwA10yNjMbbKatigwAdOqcmwPxQP/S1v/zK8rBXpXH8eH4au2CDkdqOULzRUxatVDyRXAv/AHFKxPa27ihHIrgpd89hb+ISRafyu23TUr075IN7LaXMfiCBDQRAvmbe2t1ins+qtLwodkS5uqicFBUNUCCqBHVChKoRYJVRnBanaI5hCVVzgakVB3x52S0YsNUJNg2w1zdMr3DwNwmzylgEVag/ia13l2T9EMOxy6SYeJg3Cme6HMcNnCfG3vCgpm9l3XcIcBdwGYgbbgnxCrU12wDpb99Fj6pl2kAHS7rCdPHTu5oXgdaW+APmueIYo06uYQYp/hMyZMeAsPJS9nxSNqE0TAIbAiTf8RBnwHqt4fYH7+4UvDnNew3F9RyzAOj19FFhTmB5/f1QNAfEKwdXps3AcZ7wLR3QUO+qW1Wt55mkzFzEe3sjHcMaavzDmzAR0Igi/VDcVwzQaRAg5/TKdfbxS2LS+lga4LgCC4kmNekfrr5qu4msA0DeATGkxbTdMcJUcaklxMt5W2RmRbiZOII8j01lTPfIOlhry5oPESWhrRJ+jb/RTZhN7GBHXuRTyT0SYE8kv4g+XnuH1RzSleIfLnHw9P1lNj2nl0rfFB+/b/SfoUNUH7wdWj3Kl+IHkVKZGtx6IOnVBqC89mCLWufIp70WOOM/gKq2Ipw50jWLmBqdgNo+wrTxj8Du4pM9sgS0kdZ20W8fQ5usHQyDNThrogi5B3MCTFlupRBdIe4naXSBpsfoswTSLZ8k7E2jpOpt6o3CUm+M3zA+hTplHH2fu6p+YAA0DI2bmfzk92gVJlWzj1m1BaAefcqmFTEK05G8AJFdpBggOM+BCCcmHw6R864kZT4aXTXoFo/b37uPl/ZbUBxoFiPINI8zdaUjcPRhTIABMmACeZ5qJyMqBCVQorBawQlYI6qEFVCzAamiHDoIKIqhClZllZUBAM6gHz0S/F2q0zzzMPiJHqFPwy9MfemiH4yOxm/hId5H9Ek7PemhhMr3SZnYz9TCK+cGzpAtf2HPUpYyrnaJLgZ2Ow0vebBYXZoBLuhETbQmdDZWRWX4dxMMYdh2T3G3vB8014zgXVMjmNBcDc6dmDY+OiQcCcJe03E+4v8AVWnhdexafxNseo/K7x9weSnlPZ8aH4OS3Mx2od32hq7ovyPcHCA53Z5WGx+796mq0/3xEatDu+Mw/wDFLfiSjUy/MBsxtoN5nUenkgfZoyqHTGxI8fuEj+JcY2GsE5g4EkRAvEHqpc3ymAP7QfD5B6A+BEBRcTDHsJZlJcIiwJO3We9LT43ktr2LQDIkzczM3B8IRoxDm0y6LyIjWzxDfdYcGXDtNaGtMEm3aMDTWZI1U+KYQGtmxmT5WCXHk+dhvgHlznH8ogDeZBJv3x5KVrgT1gT9PqusPQDGtaNuVgZ391FQvcjex6DQkbb2T1DtNXrZQTyE+SUNJi+pue83PqiOKVNG87nubB94HdKDL0+H3Ty+xF8SNlzN7/Qpfo5ugsbDTVvqmXGqzfmUwTuT4BpKV4mqDUaAI15dE96LE3FPwHuSx4fUIAJMEZoOu6a48dg9ySYOrlk+s/Tml8Zs0+LodoCLAa2HRQUQ/JqXSZkk/wDBt7J3gXlzbiZ9lqu1jW39BtrpuqEUzjeHysqGZBgjxOnn7KsBW7jTSaFQ6Nsdry4eUclUQqYlrCiuEA5+zFhvHMc0I5MvhykXVHAfwH3FkaB23DuI/J4lv1WI1vDnRcNB5ZnCOkLEmx09IeZQbyjCEDibFc9XQ1Ag6qMegah1WYHW5oN2qLrGxCBqG6LG3Bah7Q21+n33IvHUszHN5gj0SnhNWHxzB/X6Jw50hTp4T4eoHBr4MgNmIIOgPUKOo85jydNpJt4/dl1RpOh7Q4w1xEDkTIPXX2UlPDNc7KS7rMz1uVedI0VwGuG1ImzhabXG1+/3VnqVspDxcixHNp1HeNR1EblU80mPc6m5ogAd8jcEaG+y5PCWbuq93zqv/kkyyk4ppjby9LDw99JwuC11+YIaRCh4thQ9vacQII2i9tDqq18JYwsezDkk5HE0ySSflua6WydcrhHc5qe8SxfbgGwiB7m2qS1Rzg2tq4ZjXXPywB/VljzlVXD1GyA9xA3tMHa294T74cxLQHNJAFN5AOlgY19PBV3i+CeysWsaXNklpF7GZBjQgT4d60HS0cIqMeKjyTlzzBO5YJsNbzARuPpj5bhAnUTbyKrvw9hwx7i9zWjK0gF41DiRm6iNO5PKvE6P5qndE3N7W338Fr2CWvWfT+Wyblu9yY6jRdYTFBwPMEyNxJn7KUcW4zSJYQ4wJnbQyRf26qrs+OaIe40mVqr3ADQAWmALzEk80NW3huB/xDjMQarnUqjWUwQz8GZ0tkkyTAGYkaflStrazyc+JrbaZGDf+Fs+qLxNRxptkXJDnbAEm8DX8RWU2J7bOCSSh6WBYwhzZJJguc5zjcaS6SO5DlgFRsbEg3mZn9Efj2AUzaRIJAtN+5APgOpiQTtck3BN5Rxu8aGU5hliHg0yeiXDAyyS+AQDYSbwBpsmdd4LDBGnNVGtiDzMzlvmiOkfdkfG2Z03H5BABIgQZAnb3Qwr/MeJdqQAI3tyPNR1ATANzFoNjzJB+iDpNe1wOUkj8IF+fddUSMPi3DgYaobWDYAH8wB9159F1cePVicPVl1+yIMzOYSLqnBUxCtPT74MaPmPcZ7IGgn8RInw1SFysHwbnmrkIFmzJj+PoUb0B9i3w8gZAOVrW0WIDE4ioHEFrfJYpn09RlC40WUxddRYgqHpYFPog6+pU5KGxAQYHUKCeEZVQlS10YDVCpBB5FWECPEqssNlYcNUzMB5gT5QUMjRHRp/vXt0Dmh3iOyheIYrK6ACCJB5EkG6Jquy1aTuZLD/AKhb2SHjuLHzSKZM99iYgiNoT4cxPPsbgA4VJc5zpAguAkyOmnmm5SYOAptqCAQWgjeZueu+ibEpPJOT4dFnHWvDW1abzTqMcC14vAccrpBsRBmDyCBdxziI7b67ajWEH5YYwZp2swGY6p1jaBfTe0XJBjv29VLw7gj75j+YuAGg1i+pt3JsNa5DLe+A/D8LXLS5zyM8vAaB2M3PN+InWCBEpS/gVeb4uoR0cRz5d6vlHhY3KYUuHUxt6LTgK84p8BdHaqVXd9R/tMLr/pOiSC5rp55j7zMr1D9jpjQd9vZQ1aLOXom3Q4ef1+A0IiCRG8nxmZBjqoq+JewgM/Lo24iYFxu0aeKvbqDDpBQmI4c07ISjZtSvmvcQSdCBI3AItYaJzTK1xPh7msim0G/iuWlLnyOHDMa7sHunyVep1Dma6dTI1jTcp/Xu08oSH5eVw2uO65H0Rw6oZ9w9NNoZIaG2VfawiXCJnsgkXk3IBsrI8fu/DZI6VK5kwzqJbcxf7st42zSYegSbk8xJJiDoDtstvcdJgidbi9rztqj6WDBaDmJib+PJR0+F5rlxgW7+/oqpqx8R1s1NwnSNhBuLi6q4V7+LcE1mFJAgy0c/zBUmtRLQ027QmxB8DGh6KmJaicrN8EUXH5hbqC0eHaVYcVYfhaoWsqETOYR4D+62XQDMZWaXuJBmVpLcRXlxN1iGh29fqG64dOUTrvGikxLd1AX2hcroB1BdC1yiX6obEaFZgVUWQlTQo0213QthKIBajYlN+D1ZZHIn9UnxTtlvheOLX5LXE32gx9VrNtKbcZaTSJFi2HCNRBVcwdHM4vhxI0Iv2u7mrVW7TSOYI80Jw7DtFEC5LrwDFwencjhWzgV7WgXGtpjSNYEQbx6ptg+21pG4BXVRoeC0t1F9J6Ivh1ENaP8Ak+a2UDGi8JQDbkLK/FGU7T1+ygOKY4tbA16ct/RVuc93yOQ5Xt423QN2sNX4gJ/y2ud3Wbbrv5jVQ4zjlduthawJAGovA8EkdXL5g3J1HJuiyq6pAzOJa4REajWT1S7HSyU+JE0HVMzpBHZJkXIFjaRdI3cRquBHzXTqYPMzCF4ZiqjC5oLIc382lriBz8UK38wBkbjQ3tIjQQjWkOKfEK7Zh86WcDv5pph/iIWa/suG2oPc7RVfISQNoaJmHGxvO82ttdEVqBLcpgm8308bd60rWLhTxAcJ1S/HsgyN/dR/D1F3y2zPO4gxtI5wpOMVg0sYdS72BKJQ7rhCYnhOVmfMXGxv3zYAWReYIDH8Yt8sDaDpsCPdHAcpsx+aMuWb5ZjppKW4V89mNzprckE3sBZGsjLMCYiY25JPS4gWktH8R268/NDxhlNw5w+IZAbYHQhxGY/qOu6krYmG/ugCZi2g631CrXzZdnN40Em51H3upxxq3P8Av1kFV2T40P8AFfEM1A0iDnlp6WMm3gqbHgnnHK+Zkxew1nz62SFVx6JlNOSrh8GMaKD3OAJ+YQO4Nafqqi8Kw/DvEfl0XCAe0T10AWy6CTdMBw41e2G2cT7kcliv3wdwsVMHSqOBl2c6H+N8ei2pfJK58iqpkINyLDrISooO0K9Q1hZTPKgqmyLAaqFri8IqsLygMQ4+iIB8RUkwOXslfz4rMM6HL5qXE1g2TsEqa8yXDZ2YeBVMYW16Hhvwhc8PgB7d2vO+xg/qoeG1S5s7THgocTIqOAntNBEcwYnrEqePZ8ukuJrQ+RUyzFr6DonPw3i216ZAN2uc085BtbqIPiqwzDZh2pnnEbDpZL8NVq4PEsqNPYqHI/XLN8s+nmVTW05V241wovFtdfJVPEMe0lpGXXWbr0Th/FqVQNDuy427Wh7naH3R+I4NSqagGVPR96eSCvB59PvyW3BxtEDTX7+wvRXfBNAmWtF7yCQFtnwU0GROoOs6dENG+UefUsGW6uudGxJgi1tRKJoUmgm4c5olwbEAXBgz3C+i9Ab8GtIvLt50I9jCIw3wnh6f5Gj100W0Hyea4TD1agkDUkgAHfQTtbdWHhPw26Q6pfeNlcMRSo0WkkCP9IHqQllbi2YEUmZv5tGecX8Ftab5bax72UKZJIB2Xl3GeJPfiM4JAaLd5sfGArDxLGnK6pWMntjo0NJaQP13VPaKlSX5fxGQI0H5R5QqSNj3ymdxCqf/AJHedvJd4aoMrpknKR6EIf8AYn7qdmDIN5jv8/qjJo2WW+kAx1bLl+Y6O8pxwWm75LTE3d6koVmFpjSfH6JpggGsgIDlzA9fCjaRa+hPqEN+zz2iSYEaRHLombkPXqdAjsmtE3FqYyWtcfVL8bSpuDTTaWAAB0uLgXfxCdJvbomHGqoLRA3/AFSvKCnlpbqhwwd/30TDC1DkIAsJMAeaHpYWofwgmOQuii+r2snzGkNvGYbRJjRP2hLPT6C+DGvp4HDMFImKLLzuQCduZWJlwiqRQpAGwY0DyCxc1wyv81/0bj3j+VMeEO9EVSh6hSLwNVCDxRR9STbYfVA4kX6IsBrGBPfKW4ioIj7+9UwxF5MQDt4JPXu62x+iaAV44HMBs5rh46hBU3lrJ6/8pjWu/nlg+cpZj3j8Pf8AQquP2Jku/AMQH0gRy9rfoiqroqU3dcp/1D9YSH4Mq9jL1P37J5xD8BI1EEeBlSs1kecwxFAHzSX4toTQewW/OD/SRPiJnzT2m4EAje/mhOK4T5tJzASLE23MGx6XTlhF8HfFDSBRrQHaXiHefsvQMIxhAyPcz+l5jyMheFV8PmuLFNuE8ZxdBgd2nMm2aSLdR9VrjvmGsse54ZtYXFaejmA+ohT/ADKvNk8+17QvMeBfHz6j20yyC6wOa0/RX/CuxDr5Wx/UEtlgCalLEGIqsA37BJ8JKytTeLmq49wDRttddNo1+TR/q/RLOKsrtabt63JKFaF3xJRbkYZJeXtJGa7gDLgAek6IXjvxDSpNMuAtAA15WAVO49xXFPIa29zEDTbU6EyfVLsLwUuOas8uO4Bk+J/RGY+6NSGu/GPuC2i0yf5jOiaiBaIW6eHDRAMAaDSF05vVG1pw2GBcPYCYUlMreedQgbaAUQTACk+UBzUrVsMQHaGo4TAJ/RD1Wo97Ag3BwNgNeX6IxuCriOHzC2xS7Jld2hab8k+dJ2sg+MMHyxGub9U+N9FzxnxtWf4fwdB34RsdSfff0WuK4I9loEgvaOcSQJkahVXhmPNO0x0Kf8L4m6tiMPTIBBqN6mxmRryV5xO3l2y3WnsPC87aTRkNgdxzKxSNrH8oJHMae6xce9cOi+TK3dv4VN4QlUXRbnIaug7A5dcIPGIpyBx1a6wlWKqRI5/RJ6eIzZo1BI8QmdYye5Imy2rliO3M85BmeXLwT48lpZVxBa++ot6/8IWq6TPRS8UP713f9AogLhdE6QtNPhzHFlQDYmf19Fealwe5ebYR+VwPIFWL/qdwAApjTUu+kKXkx52r4+TvAcTdDWEAxbysnT6gFyqBhuIOJe4QDOaPeJRtTjT3AEVCCe5DRvjSfE0C2q5kXzkAd57P0Vxo4UMa1g0aNff1SLhWHNTGTMhvbJvfYa9fZWzEiyFU2S1sOzO14YA4OBmBOom+69Z4U7sA9F5c9tjAmxhej/D1XNSbfUBKTI9bEJXxloLHdyMe64AFjqZ0iPdAcT/Ab7LUkeYMokuJ0G9upUrwR3InCEgugSJPupcbgS2C6BIkQdeY71tnLxrsuqVKJm6kZR5rQdHT0RZGWQtFqkc/eJClkdFgCtPNdBdvYNVw1ywytu0UTwIi391I9DvWHbipBGqBxzQA2fwzc+2myYtozrZTfs0zMGfKEQvM0SYPAl7gcodTJ5gOb4kX/unfw5wan+3UA3M1wJdq0gQ10GNYQh4Y9js1J+XodPFNfggPdxNrqmXsUXiRPNp3vufNG23ty3xa9PUKeIc0QaYMbjQ+SxcYfigDYAJEmO6Tbw0WKPyn9SP71XBooHhTTdQ1EXoA65SrGOTDFOSjGVNkDF1N5OvM+hS3iTi0hw6g+4RgqEve3YRHiEBxCuMmU6x9+ypjOSZXgjxDpdPVRPspchIMbQtVxZnW66UEThKNw4BbfVBlqPwogSlyV8fDHUsoB5rQdBXdR5Bb5+65eAO9Lo9ykq3/AAjTGR1Q2LjlH9Lf7k+SdV2yo+H4fJTYzdoAO14k990QXypU0C0qYzAHf9E/+F8R2CzdpLf+0wklWmDI0Ox5HYqfCCoypnYM2Zoc4DWYgkc9kAyi85tEDxSp2DPJLafGJEGQfUIXG4qpVlrGk9f15Ik0ScNu5/ipeJVS1h7R5ZZ1m3msw+FNKqWk3iT3lQcUnO08hPjzQGIq1SIlDGuSIhSPqdO9RNRM186RJ9NlNQrCNvNQuYbi8brkMOgRAW5wjZRFi7p0I71JlQGQK5i4aFOWrRhYWmtJ18EUwKOmfJdsZ2pWK6ITb/DymH4yud20hHi6/slNQKw/4YUm/PxLiBpTaPDOT9EYXL+FYDgHgmzz2nEQARBJI9CsVokcvVYh+litPrMpOo88JUOINlK90ITEGYBSJl+MelVY+cJpjHdlI8c/sujUA+oQN6RP57/f91X+IHPUgdAPHUo7hFdzmkEzlsO6PvzSyg4/ME8yPdXxx1alld6d0aOQxM5p25CUDiquZrOghNMa8AddR7H0SYOVMeeSZfZ1QbKbUqWgGp8uSC4fSBN58BN9kzfWytJiLQPohTQC4S90bdkGPNNOC8Pz1mbtBzE/09q/jA8UHgaUCTqbq4fC+Db26gzEHsw4DQQTcG+14CW3RtGrqghR0ZPmp67joBC6psUlekTxZG4F8VGf0keyHrjslD4GiWVGE/xG86zf0hALdrplB1aD3gFc13W+wtUjYLitosnpVeLVIr5tst/AhAYxwfBadPeQmvEqM1AeQPuIQNUBr/wgTJgCBtstKfQA0TE/XwUlKkY/CSE2w4G4HRR18oNz62RYoxVUFsQYHNaY3+Uj2uusRVm0W5GOakwrRf1nz++5YdMg81ovU1Sjew1WnA+XksyKJUYb0UrV0y6zOWqRrhvZbcVw6T7rMksVY/8ADZtsQf8A7QPJoP1VXDiJsFb/APDZv7mo7+Ks4+Qa36JseyeTpYavFmNMZtO9Yk+LpOa8tykxoRy235LEnzzVn0svMy/H/SquZKDq+6Nquh3ggK7pKBIW45pnylLcTS7U9CD9PZMsVWM2HRV/F8RyAyZIeQR0MwVsZb01upyU0quSu8aAk27roGlW/eCYu4T5qbFVA6agNzII++kIWoLA+K6pHPak4tVl9tBI8iVBXgmRy+/WVzUEld4akXOgCe4bDfuR6jTmmmCpQ0R9/f0XOK2bzN+5E02wBKhpsL3uOsDmN/spKpE3ywQzLd0HMAHSINp205clfuBYf5dFjdDEnvd2j5THgqxwThmf8xEkDsmJg3kjUWVzpYfUONye631SWmiCo28yumuXNZoBWBk3Cmrrh1XEghD8OxoP7uoAHtte0x/Cd+5FU2qHF4FlQdoeO6FGSH+HxIA1P3spatYGIM2uALzaPqqlTpvYexWIgWa4SB4GfSES9+IfrWAGhDRHhIIKwfp/3GcSxTWCX9kDnr4DUpNRq/OeahENgBgOsbn28ljeFsBzEmo7m45j5fqiS9selgUY1xnpqnU7xyndDVjmPPbuWyCYLoA0B70ZRploMGOnus1mgDMOQRJi/NEOoXnX7hEvELTYWBC5iiqCEUVG9tliwBUAjcLiCinEHr9+602nMWgbaeyJnDWSuXgjYoplPmshYC2ec36fqrh8D4oNwjAbZnPdPe90egVYxNQDrYyrZ8McIecJQe3UgOj+qSD/AGQu/SH1Ny+M+I3E1XtcRLrcpWKWg+rH+W463jqsTfJyf5V+tqUDX081ixTr0cS+oO0fBUTiR7dX+s/VaWKvi7L5C92niu6ugWLF0IIn6plwb8Z/pd/tcVixDLo2BlX0CFwo7DjvmHs5YsU1MVv+Ev8ALb/W/wD2tVmp/QrFinezhm/id3D6qOnotLEp/TdQ6d67J9lixYYyr+iEqH3WLFjRlE9k+P1XNMe6xYsHsVlFrclw8dk9/wBVixArpmgQ9M9o9/6rFiICVBjT2T97hYsWadh2jtHpKIobLFiw1ldDMPv9FixYEFQ2d3fqrx8EuP7NhrnRo8LWWLEufSfl7n7n+Aecmp/E/f8AnctLFi6IhX//2Q==',
        'https://i.pinimg.com/564x/5e/a1/29/5ea129cb6d2446320ff3ed23547462ac.jpg',
        'https://i.pinimg.com/564x/d9/00/af/d900afa0a17c0a94330077bdb0c68e8b.jpg',
        'https://i.pinimg.com/564x/2e/21/eb/2e21eb3e81ee9f4915f629e7fb79f0a8.jpg',
        'https://live.staticflickr.com/7192/6899964496_78eb2931b5_z.jpg',
        'https://i2-prod.mirror.co.uk/incoming/article11459934.ece/ALTERNATES/s615b/PAY-Crazy_toilets_1.jpg',
        'https://i2-prod.mirror.co.uk/incoming/article11459927.ece/ALTERNATES/s1227b/PAY-Crazy_toilets_2.jpg',
        'https://i2-prod.mirror.co.uk/incoming/article11459936.ece/ALTERNATES/s1227b/PAY-Crazy_toilets_19.jpg',
        'https://i2-prod.mirror.co.uk/incoming/article11459925.ece/ALTERNATES/s1227b/PAY-Crazy_toilets_8.jpg',
        // 'https://homeideasmag.com/wp-content/uploads/2013/05/10-as-toilet-seat.jpg',
        'https://www.nzherald.co.nz/resizer/lszki9BeSHmS4xqNI3Le9vEG6SE=/360x384/filters:quality(70)/arc-anglerfish-syd-prod-nzme.s3.amazonaws.com/public/JAOVGXSPMFA77BMTGGGFTAS5TA.jpg'
      ]
    };
  },
  mounted() {
    this.$gtag.pageview({ page_path: '/bathroom' });
  },
  methods: {
    handleClick(index) {
      this.$router.push({ path: `/bathroom/${index + 1}` });
    }
  }
};
</script>

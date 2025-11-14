import Image from "next/image";
import React from "react"

export default function Player() {
  return (
    <main>
      {/* === Pemain Kiper === */}
      <section id="Kiper" className="content-page">
        <h1>Kiper</h1>
        <div className="player-grid">

          {/* Kiper 1 */}
          <a href="/player/marteen">
            <div className="player-card">
                <img
                  src="/images/players/Marteen-Paes.jpg"
                  alt="Marteen Paes"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Marteen Paes</h3>
                <p>1</p>
            </div>
          </a>

          {/* Kiper 2 */}
          <a href="/player/ernando">
            <div className="player-card">
                <img
                  src="/images/players/Ernando-Ari.jpg"
                  alt="Ernando Ari"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Ernando Ari</h3>
                <p>12</p>          
            </div>
          </a>

          {/* Kiper 3 */}  
          <a href="/player/nadeo">
            <div className="player-card">
                <img
                  src="/images/players/Nadeo-Argawinata.jpg"
                  alt="Nadeo-Argawinata"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Nadeo Argawinata</h3>
                <p>16</p>            
            </div>
          </a>
        </div>
      </section>

            {/* === Pemain Bek === */}
      <section id="Bek" className="content-page">
        <h1>Bek</h1>
        <div className="player-grid">

          {/* Bek 1 */}
          <a href="/player/kevin">
            <div className="player-card">
                <img
                  src="/images/players/Kevin-Diks.jpg"
                  alt="Kevin Diks"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Kevin Diks</h3>
                <p>2</p>
            </div>
          </a>

          {/* Bek 2 */}
          <a href="/player/jay">
            <div className="player-card">
                <img
                  src="/images/players/Jay-Idzez.jpg"
                  alt="Jay Idzez"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Jay Idzez</h3>
                <p>3</p>          
            </div>
          </a>

          {/* Bek 3 */}  
          <a href="/player/jordi">
            <div className="player-card">
                <img
                  src="/images/players/Jordi-Amat.jpg"
                  alt="Jordi Amat"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Jordi Amat</h3>
                <p>4</p>            
            </div>
          </a>

          {/* Bek 4 */}  
          <a href="/player/rizky-ridho">
            <div className="player-card">
                <img
                  src="/images/players/rizky-ridho.jpg"
                  alt="Rizky Ridho"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Rizky Ridho</h3>
                <p>5</p>            
            </div>
          </a>

          {/* Bek 5 */}  
          <a href="/player/sandy">
            <div className="player-card">
                <img
                  src="/images/players/Sandy-Waish.jpg"
                  alt="Sandy Waish"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Sandy Waish</h3>
                <p>6</p>            
            </div>
          </a>

          {/* Bek 6 */}  
          <a href="/player/calvin">
            <div className="player-card">
                <img
                  src="/images/players/Calvin-Verdonk.jpg"
                  alt="Calvin Verdonk"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Calvin Verdonk</h3>
                <p>17</p>            
            </div>
          </a>

          {/* Bek 7 */}  
          <a href="/player/shayne">
            <div className="player-card">
                <img
                  src="/images/players/Shayne-Pattynama.jpg"
                  alt="Shayne-Pattynama"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Shayne Pattynama</h3>
                <p>20</p>            
            </div>
          </a>

          {/* Bek 8 */}  
          <a href="/player/dean">
            <div className="player-card">
                <img
                  src="/images/players/Dean-James.jpg"
                  alt="Dean James"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Dean James</h3>
                <p>21</p>            
            </div>
          </a>
        </div>
      </section>

      <section id="Gelandang" className="content-page">
        <h1>Gelandang</h1>
        <div className="player-grid">

          {/* Gelandang 1 */}
          <a href="/player/joey">
            <div className="player-card">
                <img
                  src="/images/players/Joey-Pelupessy.jpg"
                  alt="Joey Pelupessy"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Joey Pelupessy</h3>
                <p>14</p>
            </div>
          </a>

          {/* Gelandang 2 */}
          <a href="/player/ricky">
            <div className="player-card">
                <img
                  src="/images/players/Ricky-Kambuaya.jpg"
                  alt="Ricky Kambuaya"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Ricky Kambuaya</h3>
                <p>15</p>          
            </div>
          </a>

          {/* Gelandang 3 */}  
          <a href="/player/marc-klok">
            <div className="player-card">
                <img
                  src="/images/players/marc-klok.jpg"
                  alt="Marc Klok"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Marc Klok</h3>
                <p>18</p>          
            </div>
          </a>

          {/* Gelandang 4 */}
          <a href="/player/Thom">
            <div className="player-card">
                <img
                  src="/images/players/Thom-Haye.jpg"
                  alt="Thom Haye"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Thom Haye</h3>
                <p>19</p>          
            </div>
          </a>

          {/* Gelandang 5 */}  
          <a href="/player/nathan">
            <div className="player-card">
                <img
                  src="/images/players/Nathan-Tjoe-A-On.jpg"
                  alt="Nathan Tjoe-A-On"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Nathan Tjoe-A-On</h3>
                <p>22</p>            
            </div>
          </a>

          {/* Gelandang 6 */}  
          <a href="/player/eliano">
            <div className="player-card">
                <img
                  src="/images/players/Eliano-Reijnders.jpg"
                  alt="Eliano Reijnders"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Eliano Reijnders</h3>
                <p>23</p>            
            </div>
          </a>
        </div>
      </section>

      <section id="Penyerang" className="content-page">
        <h1>Penyerang</h1>
        <div className="player-grid">

          {/* Penyerang 1 */}
          <a href="/player/ramadhan">
            <div className="player-card">
                <img
                  src="/images/players/Ramadhan-Sananta.jpg"
                  alt="Ramadhan Sananta"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Ramadhan Sananta</h3>
                <p>7</p>
            </div>
          </a>

          {/* Penyerang 2 */}
          <a href="/player/stefano">
            <div className="player-card">
                <img
                  src="/images/players/Stefano-Lilipaly.jpg"
                  alt="Stefano Lilipaly"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Stefano Lilipaly</h3>
                <p>8</p>          
            </div>
          </a>

          {/* Penyerang 3 */}  
          <a href="/player/miliano">
            <div className="player-card">
                <img
                  src="/images/players/Miliano-Jonathans.jpg"
                  alt="Miliano Jonathans"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Miliano Jonathans</h3>
                <p>9</p>          
            </div>
          </a>

          {/* Penyerang 4 */}
          <a href="/player/ole">
            <div className="player-card">
                <img
                  src="/images/players/Ole-Romeny.jpg"
                  alt="Ole Romeny"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Ole Romeny</h3>
                <p>10</p>          
            </div>
          </a>

          {/* Penyerang 5 */}  
          <a href="/player/ragnar">
            <div className="player-card">
                <img
                  src="/images/players/Ragnar-Oratmangoen.jpg"
                  alt="Ragnar Oratmangoen"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Ragnar Oratmangoens</h3>
                <p>11</p>            
            </div>
          </a>

          {/* Penyerang 6 */}  
          <a href="/player/mauro">
            <div className="player-card">
                <img
                  src="/images/players/Mauro-Zijlstra.jpg"
                  alt="Mauro Zijlstra"
                  className="player-img"
                  width={300}      // any number, will be scaled
                  height={300}
                />
                <h3>Mauro Zijlstra</h3>
                <p>13</p>            
            </div>
          </a>
        </div>
      </section>


    </main>
  );
}
const Features = () => {
    return ( 
        <div className="mt-8 text-center p-4" id="section3">
          <h2 className="text-4xl font-bold">Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold">Intuitive Query Understanding</h3>
              <p className="mt-2">Levi uses DistilBert to comprehend complex legal language and context.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold">Instant Legal Insights</h3>
              <p className="mt-2">Get immediate answers to your legal questions.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold">Case Retrieval</h3>
              <p className="mt-2">Access relevant case summaries and court decisions effortlessly.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold">Document Downloads</h3>
              <p className="mt-2">Securely download case-related documents.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
              <p className="mt-2">Easy-to-use chat interface for seamless interaction.</p>
            </div>
          </div>
          </div>
     );
}
 
export default Features;
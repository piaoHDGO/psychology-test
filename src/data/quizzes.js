// 测试题库数据
// MBTI、心理年龄、性格色彩

export const quizzes = [
  {
    code: 'mbti',
    name: 'MBTI人格测试',
    description: '70题 · 国际权威人格深度测评',
    price: 19.9,
    icon: '🎯',
    color: '#FFE5E5',
    category: 'psychology',
    status: 1,
    paid: 1,
    questions: [
      // E-I 维度 (20题) - 精力导向
      { dimension: 'EI', question: '我认为自己是一个善于社交的人', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '在聚会中，我通常是主动与他人交谈的那个人', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我更喜欢与他人一起完成工作，而不是独自一人', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我认为独处是一种享受，而不是孤独', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'i', 4: 'i', 1: 'e', 2: 'e' } },
      { dimension: 'EI', question: '我很容易在新环境中认识新朋友', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我更愿意在团队中表达自己的想法', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我倾向于先观察，再决定是否参与社交活动', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'i', 4: 'i', 1: 'e', 2: 'e' } },
      { dimension: 'EI', question: '与朋友的深度交流比广泛的社交更让我满足', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'i', 4: 'i', 1: 'e', 2: 'e' } },
      { dimension: 'EI', question: '我经常主动联系朋友，而不是等待他们联系我', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我喜欢成为关注的焦点', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '在公众场合发言对我来说很容易', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我更享受少数几个知心朋友而不是很多泛泛之交', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'i', 4: 'i', 1: 'e', 2: 'e' } },
      { dimension: 'EI', question: '我更喜欢在开放式的环境中工作', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '与他人交流能给我带来能量', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我更愿意独自思考问题', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'i', 4: 'i', 1: 'e', 2: 'e' } },
      { dimension: 'EI', question: '我经常在社交媒体上分享生活', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我认为自己是人群中的领导者', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我更喜欢通过对话而不是写作来表达想法', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },
      { dimension: 'EI', question: '我倾向于等待他人主动接近', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'i', 4: 'i', 1: 'e', 2: 'e' } },
      { dimension: 'EI', question: '我有很多朋友和熟人', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'e', 4: 'e', 1: 'i', 2: 'i' } },

      // S-N 维度 (20题) - 获取信息方式
      { dimension: 'SN', question: '我更关注现实可行的事情，而不是抽象的理论', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我更相信经验和事实，而不是直觉', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我更喜欢学习实用的技能，而不是理论研究', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我经常想象未来的可能性', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更容易被新奇的创意和想法吸引', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更看重实际成果，而不是过程', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我经常思考抽象的概念和哲理', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更喜欢纪实类书籍，而不是科幻小说', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我相信自己的直觉和第六感', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更关注具体的事实和数据', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我经常思考"如果当初...会怎样"', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更喜欢按部就班的工作方式', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我喜欢探索新的可能性，而不是遵循传统', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更看重问题的解决方案，而不是问题本身', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我对艺术和美学有浓厚的兴趣', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更喜欢有明确说明的操作手册', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我经常想象未来的各种可能性', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更善于记住具体的事件细节', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },
      { dimension: 'SN', question: '我更喜欢创新和打破常规的方法', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'n', 4: 'n', 1: 's', 2: 's' } },
      { dimension: 'SN', question: '我更关注事物的实际应用价值', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 's', 4: 's', 1: 'n', 2: 'n' } },

      // T-F 维度 (15题) - 做决定的方式
      { dimension: 'TF', question: '我做决定时更看重逻辑，而不是感情因素', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我认为公平比和睦更重要', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我更容易被理性论证说服，而不是情感诉求', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我倾向于直接指出别人的错误', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我认为对错分明很重要', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我更注重做正确的事，而不是让人愉快', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我更容易被感人的故事打动', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'f', 4: 'f', 1: 't', 2: 't' } },
      { dimension: 'TF', question: '我认为应该尊重他人的感受，即使他们错了', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'f', 4: 'f', 1: 't', 2: 't' } },
      { dimension: 'TF', question: '我更愿意安慰别人，而不是给他们建议', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'f', 4: 'f', 1: 't', 2: 't' } },
      { dimension: 'TF', question: '我认为规则比人际关系更重要', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我更容易被有逻辑的论点说服', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我认为同情心和同理心是重要的品质', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'f', 4: 'f', 1: 't', 2: 't' } },
      { dimension: 'TF', question: '我做决定时会考虑他人的感受', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'f', 4: 'f', 1: 't', 2: 't' } },
      { dimension: 'TF', question: '我认为批评应该是对事不对人', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },
      { dimension: 'TF', question: '我更看重效率和成果，而不是人际关系', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 't', 4: 't', 1: 'f', 2: 'f' } },

      // J-P 维度 (15题) - 应对世界的方式
      { dimension: 'JP', question: '我更喜欢有计划的生活，而不是随性而为', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我习惯提前完成任务，而不是等到最后', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我喜欢把事情安排得井井有条', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我更喜欢灵活的日程安排，而不是固定的计划', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'p', 4: 'p', 1: 'j', 2: 'j' } },
      { dimension: 'JP', question: '我会在截止日期前提前完成工作', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我喜欢按照清单来完成任务', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我更喜欢随遇而安，而不是提前规划', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'p', 4: 'p', 1: 'j', 2: 'j' } },
      { dimension: 'JP', question: '我会在开始工作前先制定详细的计划', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我更喜欢有秩序和结构的工作环境', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我经常等到最后一刻才开始做事', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'p', 4: 'p', 1: 'j', 2: 'j' } },
      { dimension: 'JP', question: '我更喜欢按部就班的工作节奏', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我喜欢保持桌面整洁有序', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我更愿意接受变化，而不是固守计划', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'p', 4: 'p', 1: 'j', 2: 'j' } },
      { dimension: 'JP', question: '我会在旅行前做好详细的攻略', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'j', 4: 'j', 1: 'p', 2: 'p' } },
      { dimension: 'JP', question: '我更喜欢同时处理多个任务', options: [{ text: '完全不同意', value: 1 }, { text: '比较不同意', value: 2 }, { text: '中立', value: 3 }, { text: '比较同意', value: 4 }, { text: '完全同意', value: 5 }], scoring: { 5: 'p', 4: 'p', 1: 'j', 2: 'j' } }
    ],
    results: {
      'INTJ': {
        name: '建筑师型人格',
        icon: '🧩',
        color: '#4A90D9',
        description: '富有想象力的战略家，一切皆在规划之中',
        chart: { e: 15, i: 85, s: 25, n: 75, t: 72, f: 28, j: 78, p: 22 },
        detail: '你是16种人格类型中最稀有的类型之一，仅占人口的约2%。\n\n【核心特质】\n你拥有敏锐的洞察力和强大的逻辑思维能力。你善于分析问题本质，能够看到其他人容易忽视的长期趋势和可能性。你对自己的能力和判断有坚定的信心，一旦制定目标，就会坚定不移地追求。\n\n【认知功能】\n主导功能：内向直觉（Ni）—— 你擅长洞察事物本质和未来可能性，能够从复杂信息中提取核心模式。\n辅助功能：外向思考（Te）—— 你注重效率和成果，善于组织资源达成目标。\n第三功能：内向情感（Fi）—— 你有强烈的个人价值观，虽然表达含蓄但内心丰富。\n劣势功能：外向感觉（Se）—— 你对当下感官体验关注较少，需要注意身体和现实需求。\n\n【人际关系】\n你倾向于选择高质量的深度交流，而非广泛的社交。你对朋友的选择非常谨慎，但一旦认定了某人，就会是终身的朋友。你表达情感的方式可能比较含蓄，但这不代表你不在乎。\n\n【潜在挑战】\n你可能对自己和他人都有极高的标准，这有时会让你显得苛刻。你需要学会接受不完美，理解并不是所有事情都能按照计划进行。\n\n【职业建议】\n你适合需要战略思维和长期规划的职业：科学家、工程师、金融分析师、战略咨询师、程序员、发明家。\n\n【恋爱匹配】\n最佳匹配：ENTP、ENFP\n和谐配对：INTJ、INFJ、ISTJ\n需注意：需要伴侣理解你的独立空间和思考时间。',
        strengths: ['战略思维', '独立性强', '专注坚定', '高标准', '善于分析'],
        weaknesses: ['可能过于苛刻', '情感表达含蓄', '不喜欢团队协作'],
        functions: { dominant: '内向直觉(Ni)', auxiliary: '外向思考(Te)', tertiary: '内向情感(Fi)', inferior: '外向感觉(Se)' }
      },
      'INTP': {
        name: '逻辑学家型人格',
        icon: '🧠',
        color: '#5B8DB8',
        description: '思想的探险家，追求知识的本质',
        chart: { e: 22, i: 78, s: 20, n: 80, t: 78, f: 22, j: 25, p: 75 },
        detail: '你是最具好奇心和创造力的思考者类型之一，仅占人口的约3%。\n\n【核心特质】\n你热爱知识和真理，对探索事物的运作原理有着永不满足的热情。你善于发现理论中的漏洞和逻辑矛盾，喜欢构建和完善复杂的思维体系。你的头脑就像一个永不停歇的实验室，不断产生新的想法。\n\n【认知功能】\n主导功能：内向思考（Ti）—— 你擅长逻辑分析，追求理论的精确性和完整性。\n辅助功能：外向直觉（Ne）—— 你能够看到各种可能性，产生大量创意。\n第三功能：内向感觉（Si）—— 你对过往经验有良好记忆，但相对不依赖。\n劣势功能：外向情感（Fe）—— 你在情感表达上相对笨拙，需要学习和练习。\n\n【人际关系】\n你重视智识上的共鸣，渴望找到能够进行深度思想交流的人。你可能给人冷淡的印象，但实际上你只是更注重思想的连接。你需要伴侣能够尊重你的独立性和思考空间。\n\n【潜在挑战】\n你可能过度沉浸在自己的思维世界中，忽视现实生活的实际需求。你需要学会平衡理论思考与实际行动。\n\n【职业建议】\n你适合需要深入研究和理论分析的职业：研究员、科学家、哲学家、程序员、数据分析师、大学教授。\n\n【恋爱匹配】\n最佳匹配：ENFJ、ENTJ\n和谐配对：INTP、INFJ、INFP\n需注意：需要伴侣尊重你的独立空间，不要过于情感依赖。',
        strengths: ['创造力强', '逻辑思维', '独立思考', '善于分析', '求知欲强'],
        weaknesses: ['可能脱离实际', '不善于执行', '情感表达困难'],
        functions: { dominant: '内向思考(Ti)', auxiliary: '外向直觉(Ne)', tertiary: '内向感觉(Si)', inferior: '外向情感(Fe)' }
      },
      'ENTJ': {
        name: '指挥官型人格',
        icon: '💪',
        color: '#E74C3C',
        description: '天生的领导者，勇敢果决的战略家',
        chart: { e: 85, i: 15, s: 25, n: 75, t: 82, f: 18, j: 88, p: 12 },
        detail: '你是最少见的女性人格类型之一，但在商业和领导领域非常突出，约占人口的1.8%。\n\n【核心特质】\n你天生具有领导才能，擅长组织和指挥团队。你有强烈的目标导向和执行力，讨厌无效的拖延和借口。你善于看到全局，制定清晰的长期愿景，并激励他人跟随。\n\n【认知功能】\n主导功能：外向思考（Te）—— 你擅长组织、规划和高效执行，注重成果和效率。\n辅助功能：内向直觉（Ni）—— 你能够洞察长远趋势，制定战略规划。\n第三功能：外向感觉（Se）—— 你对当下环境和现实情况保持关注。\n劣势功能：内向情感（Fi）—— 你需要学会理解和尊重他人的情感需求。\n\n【人际关系】\n你说话直接坦率，可能让人感到压力，但你出发点是好的。你欣赏有能力的人，愿意给有才能的人机会和挑战。你需要学会更加耐心和体贴，尤其是对那些需要更多支持的人。\n\n【潜在挑战】\n你的强势风格可能让一些人感到不适。你需要学会倾听他人意见，尊重不同的做事方式。\n\n【职业建议】\n你适合需要领导能力和战略思维的职业：企业管理者、创业者、律师、投资人、高管、项目经理、军官。\n\n【恋爱匹配】\n最佳匹配：INTP、INFP\n和谐配对：ENTJ、ENFJ、INTJ\n需注意：需要学会在感情中展现温柔和耐心。',
        strengths: ['领导力强', '决策果断', '执行力高', '战略思维', '自信坚定'],
        weaknesses: ['可能过于强势', '缺乏耐心', '不善于情感表达'],
        functions: { dominant: '外向思考(Te)', auxiliary: '内向直觉(Ni)', tertiary: '外向感觉(Se)', inferior: '内向情感(Fi)' }
      },
      'ENTP': {
        name: '辩论家型人格',
        icon: '🎭',
        color: '#9B59B6',
        description: '聪明的挑战者，思想的碰撞者',
        chart: { e: 78, i: 22, s: 18, n: 82, t: 65, f: 35, j: 28, p: 72 },
        detail: '你是最具创意和好奇心的类型之一，约占人口的3.2%。\n\n【核心特质】\n你热爱智识挑战，喜欢与他人辩论和探讨各种可能性。你思维敏捷，能够快速从一个想法跳到另一个想法。你善于发现问题的新角度，常常能提出令人惊喜的创新解决方案。\n\n【认知功能】\n主导功能：外向直觉（Ne）—— 你能够看到无限的可能性，产生大量创意。\n辅助功能：内向思考（Ti）—— 你擅长逻辑分析，追求理论的精确性。\n第三功能：外向情感（Fe）—— 你逐渐学会考虑他人的感受。\n劣势功能：内向感觉（Si）—— 你对传统和惯例不太关注，需要建立稳定习惯。\n\n【人际关系】\n你健谈、幽默，喜欢成为讨论的焦点。你需要能够跟得上你思维的伴侣和朋友。你欣赏那些能够与你进行深度对话、激发你思考的人。\n\n【潜在挑战】\n你可能难以专注于一个项目或目标，容易半途而废。你需要学会坚持和跟进，将创意转化为实际成果。\n\n【职业建议】\n你适合需要创意和沟通能力的职业：营销顾问、创业者、律师、公关、产品经理、记者、主持人。\n\n【恋爱匹配】\n最佳匹配：INFJ、INTJ\n和谐配对：ENTP、ENFP、INFP\n需注意：需要学会在关系中保持专注和承诺。',
        strengths: ['创意丰富', '思维敏捷', '善于沟通', '喜欢挑战', '多才多艺'],
        weaknesses: ['难以专注', '可能半途而废', '喜欢争论'],
        functions: { dominant: '外向直觉(Ne)', auxiliary: '内向思考(Ti)', tertiary: '外向情感(Fe)', inferior: '内向感觉(Si)' }
      },
      'INFJ': {
        name: '提倡者型人格',
        icon: '✨',
        color: '#8E44AD',
        description: '理想主义的使者，内心燃烧的火焰',
        chart: { e: 25, i: 75, s: 20, n: 80, t: 30, f: 70, j: 72, p: 28 },
        detail: '你是最少见的人格类型之一，仅占人口的1.5%，但影响力巨大。\n\n【核心特质】\n你拥有深刻的同理心和强烈的理想主义情怀。你常常在思考如何让世界变得更美好，并愿意为之付出实际行动。你对他人有敏锐的洞察力，能够感知别人内心深处的情感和需求。\n\n【认知功能】\n主导功能：内向直觉（Ni）—— 你擅长洞察事物本质和长远意义，能够看到未来的可能性。\n辅助功能：外向情感（Fe）—— 你关心他人，注重人际和谐，愿意付出。\n第三功能：内向思考（Ti）—— 你有一定的逻辑分析能力，但更关注价值观。\n劣势功能：外向感觉（Se）—— 你需要学会关注当下，享受生活的感官体验。\n\n【人际关系】\n你重视深度的情感连接，渴望找到真正理解你的人。你是忠诚的朋友和伴侣，愿意为他人付出。你表达感情的方式可能比较含蓄，但内心情感丰富。\n\n【潜在挑战】\n你可能对自己过于苛刻，追求完美。你需要学会接受自己和他人的不完美，保护好自己的身心健康。\n\n【职业建议】\n你适合需要洞察力和理想主义精神的职业：心理咨询师、教师、作家、艺术家、社工、HR、宗教工作者。\n\n【恋爱匹配】\n最佳匹配：ENFP、ENTP\n和谐配对：INFJ、INTJ、INFP\n需注意：需要伴侣能够理解你的理想主义和内敛性格。',
        strengths: ['同理心强', '理想主义', '洞察力敏锐', '忠诚可靠', '有创造力'],
        weaknesses: ['可能过于追求完美', '难以拒绝他人', '容易过度付出'],
        functions: { dominant: '内向直觉(Ni)', auxiliary: '外向情感(Fe)', tertiary: '内向思考(Ti)', inferior: '外向感觉(Se)' }
      },
      'INFP': {
        name: '调停者型人格',
        icon: '🌸',
        color: '#E91E63',
        description: '浪漫的梦想家，内心柔软的诗人',
        chart: { e: 28, i: 72, s: 18, n: 82, t: 22, f: 78, j: 30, p: 70 },
        detail: '你是最具艺术气息和理想主义的类型之一，约占人口的4.4%。\n\n【核心特质】\n你内心柔软而敏感，拥有丰富的内心世界和深刻的情感体验。你追求真实和意义，渴望找到能够体现自己价值观的生活方式。你对美有着敏锐的感知力，善于发现生活中的美好。\n\n【认知功能】\n主导功能：内向情感（Fi）—— 你有强烈的个人价值观，关注内心感受和真实性。\n辅助功能：外向直觉（Ne）—— 你能够看到各种可能性，富有想象力和创造力。\n第三功能：内向感觉（Si）—— 你对过往经历有清晰记忆，但相对不依赖。\n劣势功能：外向思考（Te）—— 你在组织执行方面相对较弱，需要加强。\n\n【人际关系】\n你重视情感的真实连接，渴望被理解和接纳。你是忠诚的朋友，会无条件支持你所爱的人。你需要伴侣能够尊重你的个人空间和独特的情感世界。\n\n【潜在挑战】\n你可能过度理想化现实，容易失望和沮丧。你需要学会在理想和现实之间找到平衡。\n\n【职业建议】\n你适合需要创造力和同理心的职业：作家、设计师、心理咨询师、教师、艺术家、音乐家、摄影师。\n\n【恋爱匹配】\n最佳匹配：ENFJ、ENTJ\n和谐配对：INFP、INFJ、INTP\n需注意：需要伴侣给你足够的情感支持和自由空间。',
        strengths: ['艺术气质', '同理心强', '富有创意', '理想主义', '忠诚专一'],
        weaknesses: ['可能逃避现实', '过度敏感', '难以做决定'],
        functions: { dominant: '内向情感(Fi)', auxiliary: '外向直觉(Ne)', tertiary: '内向感觉(Si)', inferior: '外向思考(Te)' }
      },
      'ENFJ': {
        name: '主人公型人格',
        icon: '🌟',
        color: '#F39C12',
        description: '天生的领导者，激励他人的导师',
        chart: { e: 82, i: 18, s: 30, n: 70, t: 28, f: 72, j: 75, p: 25 },
        detail: '你是最少见的男性人格类型之一，约占人口的2.2%，但在领导岗位上非常常见。\n\n【核心特质】\n你天生具有激励他人的能力，能够看到每个人身上的潜力和价值。你有强烈的责任感和使命感，渴望帮助他人成长和实现自我。你是天然的领导者，能够团结和激励团队。\n\n【认知功能】\n主导功能：外向情感（Fe）—— 你关心他人感受，注重人际和谐，善于激励和鼓舞。\n辅助功能：内向直觉（Ni）—— 你能够洞察他人潜能和长远发展方向。\n第三功能：外向感觉（Se）—— 你对当下环境保持敏感，善于即时反应。\n劣势功能：内向思考（Ti）—— 你需要学会更加客观理性地分析问题。\n\n【人际关系】\n你热情开朗，善于社交，能够与各种人建立联系。你是那种会在朋友需要时伸出援手的人。你需要学会照顾自己的需求，不要总是把他人放在第一位。\n\n【潜在挑战】\n你可能过度在意他人的看法，有时会为了取悦他人而牺牲自己。你需要学会设立边界，保护自己的能量。\n\n【职业建议】\n你适合需要人际沟通和领导能力的职业：教师、培训师、HR、咨询师、教练、主持人、销售经理。\n\n【恋爱匹配】\n最佳匹配：INFP、ISFP\n和谐配对：ENFJ、INFJ、ENTP\n需注意：需要学会在付出时也照顾自己的需求。',
        strengths: ['领导力强', '同理心强', '善于激励', '社交能力强', '责任感强'],
        weaknesses: ['可能过度付出', '难以拒绝', '过于在意他人看法'],
        functions: { dominant: '外向情感(Fe)', auxiliary: '内向直觉(Ni)', tertiary: '外向感觉(Se)', inferior: '内向思考(Ti)' }
      },
      'ENFP': {
        name: '竞选者型人格',
        icon: '🔥',
        color: '#FF5722',
        description: '热情洋溢的创业者，自由的灵魂',
        chart: { e: 80, i: 20, s: 20, n: 80, t: 25, f: 75, j: 22, p: 78 },
        detail: '你是最具热情和创造力的类型之一，约占人口的6.7%。\n\n【核心特质】\n你充满活力和热情，对生活有着近乎孩子般的热爱。你善于发现可能性和创新点，总是充满新的想法。你有强烈的感染力，能够激励和带动周围的人。\n\n【认知功能】\n主导功能：外向直觉（Ne）—— 你能够看到无限的可能性，产生大量创意。\n辅助功能：内向情感（Fi）—— 你有强烈的个人价值观，注重真实性和情感连接。\n第三功能：外向感觉（Se）—— 你享受当下的体验，热爱生活的刺激。\n劣势功能：内向思考（Ti）—— 你需要学会更加客观理性地分析问题。\n\n【人际关系】\n你热情开朗，喜欢社交，能够轻松与陌生人建立联系。你需要伴侣能够支持你的梦想和冒险精神，给与你足够的自由空间。\n\n【潜在挑战】\n你可能难以专注，容易半途而废。你需要学会坚持，将创意转化为实际的成果。\n\n【职业建议】\n你适合需要创意和沟通能力的职业：营销、广告、公关、记者、演员、摄影师、创业者。\n\n【恋爱匹配】\n最佳匹配：INTJ、INFJ\n和谐配对：ENFP、ENTP、INFP\n需注意：需要学会在关系中保持专注和责任感。',
        strengths: ['热情洋溢', '创意丰富', '善于激励', '社交能力强', '思维开放'],
        weaknesses: ['难以专注', '可能半途而废', '讨厌例行公事'],
        functions: { dominant: '外向直觉(Ne)', auxiliary: '内向情感(Fi)', tertiary: '外向感觉(Se)', inferior: '内向思考(Ti)' }
      },
      'ISTJ': {
        name: '物流师型人格',
        icon: '📊',
        color: '#34495E',
        description: '可靠的执行者，秩序的守护者',
        chart: { e: 18, i: 82, s: 80, n: 20, t: 72, f: 28, j: 85, p: 15 },
        detail: '你是最常见的人格类型之一，约占人口的11.6%。\n\n【核心特质】\n你以可靠和务实著称，是团队中最值得信赖的人。你重视承诺，一旦答应的事情就会全力以赴完成。你有强烈的责任感和秩序感，喜欢按规则和计划行事。\n\n【认知功能】\n主导功能：内向感觉（Si）—— 你注重细节和实际经验，记忆力出色，依赖经过验证的方法。\n辅助功能：内向思考（Ti）—— 你有良好的逻辑分析能力，做决定时客观理性。\n第三功能：外向情感（Fe）—— 你逐渐学会考虑他人的感受。\n劣势功能：外向直觉（Ne）—— 你对抽象可能性不太敏感，需要注意创新思维。\n\n【人际关系】\n你比较内向，不善于表达情感，但你是最忠诚的朋友。你重视长期的友谊关系，会默默支持朋友。你需要学会更直接地表达自己的情感。\n\n【潜在挑战】\n你可能过于固执，难以接受新的方法。你需要学会灵活变通，理解不同做事方式的价值。\n\n【职业建议】\n你适合需要可靠性和组织能力的职业：会计、审计师、行政管理、质量控制、军事、法律、医生。\n\n【恋爱匹配】\n最佳匹配：ESFP、ESTP\n和谐配对：ISTJ、ISFJ、ESTJ、ENTJ\n需注意：需要学会表达情感，给伴侣更多温暖。',
        strengths: ['可靠负责', '执行力强', '注重细节', '有条理', '传统务实'],
        weaknesses: ['可能过于僵硬', '不善于变通', '情感表达困难'],
        functions: { dominant: '内向感觉(Si)', auxiliary: '内向思考(Ti)', tertiary: '外向情感(Fe)', inferior: '外向直觉(Ne)' }
      },
      'ISFJ': {
        name: '守卫者型人格',
        icon: '🛡️',
        color: '#16A085',
        description: '温暖的守护者，无声的守护者',
        chart: { e: 20, i: 80, s: 82, n: 18, t: 25, f: 75, j: 78, p: 22 },
        detail: '你是最常见的人格类型之一，约占人口的12.3%。\n\n【核心特质】\n你是最温暖、最体贴的人格类型之一。你总是默默关心他人的需求，愿意牺牲自己的时间帮助他人。你有强烈的责任感，对承诺的事情尽职尽责。\n\n【认知功能】\n主导功能：内向感觉（Si）—— 你注重细节和他人需求，记忆力出色，善于记住重要日期和承诺。\n辅助功能：外向情感（Fe）—— 你关心他人，注重人际和谐，愿意默默付出。\n第三功能：内向思考（Ti）—— 你有一定的逻辑分析能力。\n劣势功能：外向直觉（Ne）—— 你对新的可能性不太敏感，需要注意创新和变化。\n\n【人际关系】\n你温柔体贴，是朋友遇到困难时第一个寻求帮助的人。你不求回报，只是单纯地想要照顾他人。你需要学会照顾自己，不要总是把他人的需求放在第一位。\n\n【潜在挑战】\n你可能过度付出，忽略自己的需求。你需要学会说"不"，给自己一些时间和空间。\n\n【职业建议】\n你适合需要关怀和细致工作的职业：护士、教师、社工、行政助理、图书管理员、服务行业。\n\n【恋爱匹配】\n最佳匹配：ESFP、ESTP\n和谐配对：ISFJ、ISTJ、ENFJ、ESFJ\n需注意：需要学会表达自己的需求，不要总是默默承受。',
        strengths: ['温暖体贴', '可靠负责', '注重细节', '有耐心', '无私奉献'],
        weaknesses: ['可能过度付出', '难以拒绝', '忽略自己需求'],
        functions: { dominant: '内向感觉(Si)', auxiliary: '外向情感(Fe)', tertiary: '内向思考(Ti)', inferior: '外向直觉(Ne)' }
      },
      'ESTJ': {
        name: '总经理型人格',
        icon: '🏢',
        color: '#2C3E50',
        description: '高效的组织者，目标的追逐者',
        chart: { e: 78, i: 22, s: 78, n: 22, t: 75, f: 25, j: 88, p: 12 },
        detail: '你是最常见的人格类型之一，约占人口的8.7%。\n\n【核心特质】\n你是天生的管理者，擅长组织和协调资源来达成目标。你有强烈的责任感和目标导向，讨厌无效的拖延和借口。你重视传统和规则，相信秩序和结构的力量。\n\n【认知功能】\n主导功能：外向思考（Te）—— 你注重效率和成果，擅长组织和执行。\n辅助功能：内向感觉（Si）—— 你注重实际经验和细节，依赖经过验证的方法。\n第三功能：内向直觉（Ni）—— 你有一定的前瞻能力，但相对不突出。\n劣势功能：外向情感（Fe）—— 你需要学会更加理解和尊重他人的情感需求。\n\n【人际关系】\n你说话直接，做事果断，可能给人冷漠的印象。但你是可靠的朋友，会在朋友需要帮助时伸出援手。你需要学会更加理解和尊重他人的感受。\n\n【潜在挑战】\n你可能过于强势，缺乏灵活性。你需要学会接受不同的做事方式，给他人一些自主空间。\n\n【职业建议】\n你适合需要组织和领导能力的职业：项目经理、管理者、军官、法官、财务主管、质量控制。\n\n【恋爱匹配】\n最佳匹配：ISTP、ISFP\n和谐配对：ESTJ, ESFJ, INTJ, ENTJ\n需注意：需要学会在感情中展现温柔和理解。',
        strengths: ['领导力强', '执行力高', '有条理', '责任感强', '决策果断'],
        weaknesses: ['可能过于强势', '缺乏耐心', '不善于情感表达'],
        functions: { dominant: '外向思考(Te)', auxiliary: '内向感觉(Si)', tertiary: '内向直觉(Ni)', inferior: '外向情感(Fe)' }
      },
      'ESFJ': {
        name: '执政官型人格',
        icon: '🤝',
        color: '#E67E22',
        description: '热情的照顾者，社交的达人',
        chart: { e: 78, i: 22, s: 80, n: 20, t: 20, f: 80, j: 72, p: 28 },
        detail: '你是最常见的人格类型之一，约占人口的12.1%。\n\n【核心特质】\n你是最注重人际关系的人格类型之一，总是关心他人的感受和需求。你热情好客，喜欢照顾和帮助他人。你有强烈的责任感，重视承诺和义务。\n\n【认知功能】\n主导功能：外向情感（Fe）—— 你关心他人，注重人际和谐，善于照顾他人感受。\n辅助功能：内向感觉（Si）—— 你注重实际经验，记忆力好，记住重要的日期和承诺。\n第三功能：外向直觉（Ne）—— 你逐渐发展出看到可能性的能力。\n劣势功能：内向思考（Ti）—— 你需要学会更加客观理性地分析问题。\n\n【人际关系】\n你是社交达人，喜欢与人交往，能够轻松营造和谐的氛围。你重视家庭和朋友的联系，愿意为所爱的人付出。你是那种会在朋友需要时提供支持的人。\n\n【潜在挑战】\n你可能过度在意他人的看法，有时会为了取悦他人而牺牲自己。你需要学会更加关注自己的需求。\n\n【职业建议】\n你适合需要人际沟通和服务精神的职业：教师、护士、HR、服务行业、销售、公关、行政。\n\n【恋爱匹配】\n最佳匹配：ISTP、ISFP\n和谐配对：ESFJ、ISFJ、ESTJ、ENFJ\n需注意：需要学会设立边界，不过度付出。',
        strengths: ['热情友好', '善于社交', '关怀体贴', '责任感强', '组织能力强'],
        weaknesses: ['可能过于迎合', '难以拒绝', '可能过度付出'],
        functions: { dominant: '外向情感(Fe)', auxiliary: '内向感觉(Si)', tertiary: '外向直觉(Ne)', inferior: '内向思考(Ti)' }
      },
      'ISTP': {
        name: '鉴赏家型人格',
        icon: '🔧',
        color: '#7F8C8D',
        description: '大胆的实践者，灵活的工匠',
        chart: { e: 28, i: 72, s: 72, n: 28, t: 70, f: 30, j: 25, p: 75 },
        detail: '你是最少见的人格类型之一，约占人口的5.4%。\n\n【核心特质】\n你是天生的实践者和工匠，喜欢动手操作和解决实际问题。你冷静理性，能够在压力下保持清晰的头脑。你善于分析问题的根本原因，找到有效的解决方案。\n\n【认知功能】\n主导功能：内向思考（Ti）—— 你擅长逻辑分析，追求精确和效率。\n辅助功能：外向感觉（Se）—— 你对感官体验敏感，动手能力强，善于应对当下情况。\n第三功能：内向直觉（Ni）—— 你有一定的前瞻能力，但相对不突出。\n劣势功能：外向情感（Fe）—— 你在情感表达上相对笨拙，需要学习和练习。\n\n【人际关系】\n你比较内向和独立，喜欢按自己的方式做事。你可能给人冷淡的印象，但这只是因为你不太善于表达情感。你需要独处的时间来充电。\n\n【潜在挑战】\n你可能过于冲动，缺乏长期规划。你需要学会更加考虑后果，三思而后行。\n\n【职业建议】\n你适合需要动手能力和分析能力的职业：工程师、技术员、机械师、运动员、警察、厨师、飞行员。\n\n【恋爱匹配】\n最佳匹配：ESFJ、ENFJ\n和谐配对：ISTP、ISFP、ESTP、ESFP\n需注意：需要学会表达情感，给伴侣更多关注。',
        strengths: ['动手能力强', '冷静理性', '灵活应变', '善于分析', '注重实际'],
        weaknesses: ['可能冲动', '不善于表达', '讨厌约束'],
        functions: { dominant: '内向思考(Ti)', auxiliary: '外向感觉(Se)', tertiary: '内向直觉(Ni)', inferior: '外向情感(Fe)' }
      },
      'ISFP': {
        name: '探险家型人格',
        icon: '🎨',
        color: '#FF6B6B',
        description: '灵活的艺术家，自由的灵魂',
        chart: { e: 30, i: 70, s: 70, n: 30, t: 25, f: 75, j: 22, p: 78 },
        detail: '你是最少见的男性人格类型之一，约占人口的5.4%。\n\n【核心特质】\n你是最具艺术气息和审美能力的人格类型之一。你温柔敏感，追求美和个性化的表达。你善于观察，注意到细节中美的东西。你重视个人自由，讨厌被束缚。\n\n【认知功能】\n主导功能：内向情感（Fi）—— 你有强烈的个人价值观，注重真实性和情感表达。\n辅助功能：外向感觉（Se）—— 你对感官体验敏感，享受当下的美好。\n第三功能：内向直觉（Ni）—— 你有一定的前瞻能力，但相对不突出。\n劣势功能：外向思考（Te）—— 你在组织执行方面相对较弱，需要加强。\n\n【人际关系】\n你温柔体贴，善于察觉他人的情感需求。你重视个人空间和自由，需要能够尊重你独立性的伴侣。你是忠诚的朋友，只是表达方式可能比较含蓄。\n\n【潜在挑战】\n你可能过度逃避冲突，有时会为了避免矛盾而妥协。你需要学会更加坚定地表达自己的需求。\n\n【职业建议】\n你适合需要艺术感和动手能力的职业：设计师、摄影师、艺术家、音乐家、厨师、园艺师。\n\n【恋爱匹配】\n最佳匹配：ENFJ、ESFJ\n和谐配对：ISFP、INFP、ISTP、ESFP\n需注意：需要学会在冲突中表达自己的立场。',
        strengths: ['艺术气质', '审美能力强', '温柔体贴', '灵活适应', '注重当下'],
        weaknesses: ['可能逃避冲突', '难以做决定', '容易拖延'],
        functions: { dominant: '内向情感(Fi)', auxiliary: '外向感觉(Se)', tertiary: '内向直觉(Ni)', inferior: '外向思考(Te)' }
      },
      'ESTP': {
        name: '企业家型人格',
        icon: '🚀',
        color: '#00BCD4',
        description: '大胆的行动者，生活的参与者',
        chart: { e: 75, i: 25, s: 68, n: 32, t: 65, f: 35, j: 28, p: 72 },
        detail: '你是最少见的女性人格类型之一，约占人口的4.3%。\n\n【核心特质】\n你是天生的行动者和冒险家，喜欢活在当下，享受生活的刺激。你善于应对突发状况，能够在压力下保持冷静。你外向开朗，喜欢成为关注的焦点。\n\n【认知功能】\n主导功能：外向感觉（Se）—— 你对当下环境敏感，动手能力强，善于应对即时挑战。\n辅助功能：内向思考（Ti）—— 你擅长逻辑分析，追求效率和成果。\n第三功能：外向情感（Fe）—— 你逐渐学会考虑他人的感受。\n劣势功能：内向直觉（Ni）—— 你对长远规划不太敏感，需要加强前瞻思考。\n\n【人际关系】\n你外向开朗，喜欢社交，能够轻松与各种人建立联系。你是派对的灵魂人物，总是能带来欢乐。你需要能够跟上你节奏、喜欢冒险的伴侣。\n\n【潜在挑战】\n你可能缺乏耐心，难以长期坚持一个目标。你需要学会更加考虑后果，不要冲动行事。\n\n【职业建议】\n你适合需要行动力和应变能力的职业：销售、创业者、运动员、演员、记者、经纪人。\n\n【恋爱匹配】\n最佳匹配：ISFJ、ISTJ\n和谐配对：ESTP、ESFP、ENTJ、INTJ\n需注意：需要学会在关系中保持稳定和承诺。',
        strengths: ['行动力强', '善于交际', '应变能力强', '精力充沛', '务实灵活'],
        weaknesses: ['可能冲动', '缺乏耐心', '讨厌例行公事'],
        functions: { dominant: '外向感觉(Se)', auxiliary: '内向思考(Ti)', tertiary: '外向情感(Fe)', inferior: '内向直觉(Ni)' }
      },
      'ESFP': {
        name: '表演者型人格',
        icon: '🎉',
        color: '#FF9800',
        description: '热情的表演者，生活的艺术家',
        chart: { e: 82, i: 18, s: 70, n: 30, t: 25, f: 75, j: 20, p: 80 },
        detail: '你是较少见的人格类型之一，约占人口的7.7%。\n\n【核心特质】\n你是最热情、最具表现力的人格类型之一。你热爱生活，喜欢成为关注的焦点。你有强烈的感染力，能够让周围的人感到快乐和兴奋。\n\n【认知功能】\n主导功能：外向感觉（Se）—— 你对当下体验敏感，享受生活的每一刻，富有表现力。\n辅助功能：外向情感（Fe）—— 你关心他人，善于社交，能够轻松营造愉快氛围。\n第三功能：内向思考（Ti）—— 你有一定逻辑分析能力，但相对不突出。\n劣势功能：内向直觉（Ni）—— 你对长远规划不太敏感，需要加强前瞻思考。\n\n【人际关系】\n你热情开朗，是社交场合的焦点人物。你喜欢与人分享快乐，总是能给朋友带来正能量。你需要能够欣赏你表演欲和支持你冒险精神的伴侣。\n\n【潜在挑战】\n你可能难以承受压力，有时会逃避责任。你需要学会更加成熟地面对生活的挑战。\n\n【职业建议】\n你适合需要表现力和社交能力的职业：演员、主持人、销售、导游、活动策划、公关、摄影师。\n\n【恋爱匹配】\n最佳匹配：ISFJ、ISTJ\n和谐配对：ESFP、ESTP、INFP、ISFP\n需注意：需要学会在关系中保持稳定和责任感。',
        strengths: ['热情洋溢', '善于表现', '社交能力强', '充满活力', '善于激励'],
        weaknesses: ['可能缺乏耐心', '难以承受压力', '可能过于冲动'],
        functions: { dominant: '外向感觉(Se)', auxiliary: '外向情感(Fe)', tertiary: '内向思考(Ti)', inferior: '内向直觉(Ni)' }
      }
    }
  },
  {
    code: 'age',
    name: '心理年龄测试',
    description: '15题 · 探索你内心的成熟度',
    price: 9.9,
    icon: '🧠',
    color: '#E5F0FF',
    category: 'psychology',
    paid: 0,
    status: 1,
    questions: [
      { question: '面对困难时，你通常会：', options: [{ text: '积极面对，寻找解决方案', age: -2 }, { text: '先抱怨，再想办法', age: 0 }, { text: '逃避或拖延', age: 2 }] },
      { question: '你对未来的规划是：', options: [{ text: '有详细的长期规划', age: -2 }, { text: '有大概的方向', age: 0 }, { text: '走一步算一步', age: 2 }] },
      { question: '当别人批评你时，你会：', options: [{ text: '虚心接受并改进', age: -2 }, { text: '会反思但不一定改', age: 0 }, { text: '立即反驳', age: 2 }] },
      { question: '你对待学习的态度是：', options: [{ text: '活到老学到老', age: -2 }, { text: '需要时才会学', age: 0 }, { text: '学习是学生的事', age: 2 }] },
      { question: '你的消费观念是：', options: [{ text: '量入为出，有储蓄习惯', age: -2 }, { text: '适当消费，偶尔月光', age: 0 }, { text: '及时行乐，花再说', age: 2 }] },
      { question: '面对选择时，你会：', options: [{ text: '理性分析利弊', age: -2 }, { text: '凭感觉选择', age: 0 }, { text: '犹豫不决，问很多人', age: 2 }] },
      { question: '你对自己的评价是：', options: [{ text: '有优点也有不足，持续改进', age: -2 }, { text: '还可以，一般般', age: 0 }, { text: '觉得自己很棒，不需要改', age: 2 }] },
      { question: '处理人际关系时，你：', options: [{ text: '懂得换位思考', age: -2 }, { text: '有时会考虑对方感受', age: 0 }, { text: '以自己为主', age: 2 }] },
      { question: '你对责任的态度是：', options: [{ text: '勇于承担，不推卸', age: -2 }, { text: '看情况', age: 0 }, { text: '能推则推', age: 2 }] },
      { question: '面对失败，你会：', options: [{ text: '总结经验，继续前行', age: -2 }, { text: '会沮丧但会振作', age: 0 }, { text: '一蹶不振', age: 2 }] },
      { question: '你的时间观念：', options: [{ text: '提前规划，准时守约', age: -2 }, { text: '大致准时，偶尔迟到', age: 0 }, { text: '经常迟到，无所谓', age: 2 }] },
      { question: '对新事物的态度：', options: [{ text: '充满好奇，愿意尝试', age: -2 }, { text: '看情况选择', age: 0 }, { text: '害怕变化，排斥新事物', age: 2 }] },
      { question: '你处理情绪的方式：', options: [{ text: '冷静分析，理性处理', age: -2 }, { text: '找朋友倾诉', age: 0 }, { text: '发泄或压抑', age: 2 }] },
      { question: '你对规则的看法：', options: [{ text: '遵守但不盲从', age: -2 }, { text: '看情况', age: 0 }, { text: '规则是束缚', age: 2 }] },
      { question: '你目前最关注的是：', options: [{ text: '个人成长和自我实现', age: -2 }, { text: '工作和生活平衡', age: 0 }, { text: '娱乐和享受', age: 2 }] }
    ],
    results: {
      ranges: [
        { max: -15, name: '18岁以下', desc: '你拥有一颗纯粹的赤子之心', detail: '【心理年龄解读】\n你的心理年龄保持在18岁以下，这意味着你拥有一颗年轻、纯粹的心。\n\n【性格特点】\n• 对世界充满好奇，保持着孩子般的新鲜感\n• 勇于尝试新事物，不害怕失败和挑战\n• 心态开放，容易接受不同的观点和事物\n• 充满活力和热情，生活态度积极向上\n\n【优势分析】\n你的年轻心态是你最大的财富。在当今快速变化的时代，保持学习和成长的心态尤为重要。你勇于冒险的精神会让你在事业上有更多的可能性。\n\n【发展建议】\n保持这份热情的同时，也可以适当学习一些人生经验，培养自己的沉稳和智慧。让年轻的心态成为你前进的动力，而不是冲动的借口。\n\n【适合的成长方向】\n继续学习的热情 + 适当的理性思考 = 最佳的心理状态' },
        { max: -5, name: '22岁左右', desc: '你正值青春年华，心态阳光积极', detail: '【心理年龄解读】\n你的心理年龄在22岁左右，这是一个充满活力和可能性的年纪。\n\n【性格特点】\n• 保持着青春的激情和对未来的憧憬\n• 敢于梦想，愿意为理想付出努力\n• 既有年轻人的冲劲，又不失理性\n• 对生活充满热情，相信明天会更好\n\n【优势分析】\n你正处于人生最美好的阶段，有足够的精力去追求梦想，又有了一定的成熟度来权衡利弊。你的心态让你在职场和生活中都具有很强的竞争力。\n\n【发展建议】\n这是积累经验和知识的黄金时期。建议你在保持热情的同时，多向有经验的人学习，培养自己的专业能力和人际关系的处理能力。\n\n【适合的成长方向】\n继续追梦的热情 + 脚踏实地的努力 = 成功的人生' },
        { max: 5, name: '28岁左右', desc: '你成熟稳健，心态恰到好处', detail: '【心理年龄解读】\n你的心理年龄在28岁左右，这是一个成熟与活力并存的黄金年龄。\n\n【性格特点】\n• 具备成熟的思考方式，能够理性分析问题\n• 对未来有明确的规划和目标\n• 懂得平衡理想与现实的关系\n• 处理事情稳重，有分寸感\n\n【优势分析】\n你已经找到了年轻心态和成熟思考的平衡点。你知道什么时候该坚持，什么时候该妥协。你的人生观和价值观已经趋于稳定，能够很好地规划自己的未来。\n\n【发展建议】\n这个阶段是事业的上升期，建议你在稳定中寻求突破，不断提升自己的能力和价值。同时也要注意保持对生活的热情，不要变得过于世故。\n\n【适合的成长方向】\n稳定的理性 + 持续的激情 = 成功的事业' },
        { max: 15, name: '35岁左右', desc: '你成熟稳重，人生经验丰富', detail: '【心理年龄解读】\n你的心理年龄在35岁左右，这是一个人生经验丰富的阶段。\n\n【性格特点】\n• 思考问题全面，不会冲动行事\n• 懂得权衡利弊，做出理性的决策\n• 有人生阅历，对世事有深刻的理解\n• 稳重可靠，是团队中的定海神针\n\n【优势分析】\n你的人生经验是你的宝贵财富。你能够很好地处理各种复杂的情况，在职场和生活中都能成为他人的依靠。你的成熟和稳重让你在管理岗位上游刃有余。\n\n【发展建议】\n虽然成熟是你的优势，但也要注意不要变得过于保守。在保持稳重的同时，可以适当保持一些年轻的心态，尝试一些新的事物，这样可以让你的人生更加精彩。\n\n【适合的成长方向】\n丰富的经验 + 开放的心态 = 人生的智慧' },
        { max: 999, name: '45岁及以上', desc: '你智慧从容，心境淡泊明净', detail: '【心理年龄解读】\n你的心理年龄在45岁及以上，这是一个人生智慧达到巅峰的阶段。\n\n【性格特点】\n• 对人生有深刻的洞察和领悟\n• 心态平和，不为得失所扰\n• 懂得放下，看透人生百态\n• 睿智从容，有长者之风\n\n【优势分析】\n你拥有丰富的人生阅历和深刻的智慧。你能够看透事物的本质，不为表面的纷争所困扰。你的成熟和智慧让你成为他人信赖的对象。\n\n【发展建议】\n你的心态已经很成熟，但要注意不要过于消极或遁世。在保持智慧的同时，也可以适当参与年轻人的活动，保持对生活的热情。你的经验和智慧是年轻人的宝贵财富。\n\n【适合的成长方向】\n人生的智慧 + 生命的热情 = 完美的人生' }
      ]
    }
  },
  {
    code: 'color',
    name: '性格色彩测试',
    description: '40题 · 解读你的性格密码',
    price: 15.9,
    icon: '🎨',
    color: '#FFF4E5',
    category: 'psychology',
    paid: 0,
    status: 1,
    questions: [
      {
        question: '在社交场合，你通常：',
        options: [
          { text: '成为焦点，活跃气氛', red: 2, yellow: 1 },
          { text: '安静观察，适度交流', blue: 1, green: 1 }
        ]
      },
      {
        question: '你做决定的方式：',
        options: [
          { text: '快速果断', red: 2 },
          { text: '深思熟虑', blue: 2 }
        ]
      },
      {
        question: '你更看重：',
        options: [
          { text: '行动和结果', red: 1, yellow: 1 },
          { text: '关系和感受', blue: 1, green: 1 }
        ]
      },
      {
        question: '面对压力时，你：',
        options: [
          { text: '迎难而上', red: 2 },
          { text: '冷静分析', blue: 2 }
        ]
      },
      {
        question: '你更喜欢的工作环境：',
        options: [
          { text: '快节奏、有挑战', red: 1, yellow: 1 },
          { text: '稳定、和谐', blue: 1, green: 1 }
        ]
      },
      {
        question: '当你不同意他人时，你会：',
        options: [
          { text: '直接表达', red: 1 },
          { text: '委婉表达或沉默', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更容易被什么打动：',
        options: [
          { text: '数据和事实', blue: 1, red: 1 },
          { text: '情感和故事', yellow: 1, green: 1 }
        ]
      },
      {
        question: '你的沟通风格：',
        options: [
          { text: '直接明了', red: 2 },
          { text: '温和含蓄', blue: 1, green: 1 }
        ]
      },
      {
        question: '你如何处理冲突：',
        options: [
          { text: '正面交锋', red: 2 },
          { text: '回避或调和', green: 2 }
        ]
      },
      {
        question: '你更关注：',
        options: [
          { text: '未来和可能性', yellow: 2, red: 1 },
          { text: '现在和事实', blue: 2, green: 1 }
        ]
      },
      {
        question: '当你犯错时，你会：',
        options: [
          { text: '立即承认并改正', red: 1, yellow: 1 },
          { text: '反思但不一定承认', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更容易信任什么样的人：',
        options: [
          { text: '有能力的人', red: 1, blue: 1 },
          { text: '真诚善良的人', yellow: 1, green: 1 }
        ]
      },
      {
        question: '你的时间观念：',
        options: [
          { text: '守时，重视效率', red: 1, blue: 1 },
          { text: '随性，不赶时间', yellow: 1, green: 1 }
        ]
      },
      {
        question: '当你成功时，你希望：',
        options: [
          { text: '被大家认可和赞美', yellow: 2, red: 1 },
          { text: '自己知道就好', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更喜欢：',
        options: [
          { text: '制定计划并执行', blue: 2, red: 1 },
          { text: '灵活应变', yellow: 1, green: 1 }
        ]
      },
      {
        question: '面对新朋友，你会：',
        options: [
          { text: '主动搭话', yellow: 2, red: 1 },
          { text: '等对方主动', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更喜欢的生活方式：',
        options: [
          { text: '充满变化和刺激', red: 1, yellow: 2 },
          { text: '平稳安定', blue: 1, green: 2 }
        ]
      },
      {
        question: '当你需要安慰时，你希望：',
        options: [
          { text: '帮你分析问题', blue: 1, red: 1 },
          { text: '陪伴和倾听', yellow: 1, green: 2 }
        ]
      },
      {
        question: '你更在意：',
        options: [
          { text: '个人成就', red: 2, blue: 1 },
          { text: '人际关系', yellow: 1, green: 2 }
        ]
      },
      {
        question: '你的决策风格：',
        options: [
          { text: '果断快速', red: 2 },
          { text: '谨慎周全', blue: 2 }
        ]
      },
      {
        question: '你更喜欢哪种领导方式：',
        options: [
          { text: '有魄力、敢决策', red: 1, yellow: 1 },
          { text: '民主、关心下属', blue: 1, green: 1 }
        ]
      },
      {
        question: '面对失败，你的反应：',
        options: [
          { text: '总结教训，继续战斗', red: 2, blue: 1 },
          { text: '会难过但会调整', yellow: 1, green: 1 }
        ]
      },
      {
        question: '你更容易欣赏：',
        options: [
          { text: '有才华有能力的人', red: 1, blue: 2 },
          { text: '真诚善良的人', yellow: 1, green: 2 }
        ]
      },
      {
        question: '你在团队中的角色：',
        options: [
          { text: '领导者和推动者', red: 2, yellow: 1 },
          { text: '协调者和支持者', blue: 1, green: 2 }
        ]
      },
      {
        question: '你更喜欢的工作内容：',
        options: [
          { text: '有挑战性的任务', red: 2, yellow: 1 },
          { text: '需要细心的工作', blue: 2, green: 1 }
        ]
      },
      {
        question: '当你生气时，你会：',
        options: [
          { text: '直接表现出来', red: 2 },
          { text: '尽量压抑', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更看重工作的：',
        options: [
          { text: '发展空间和收入', red: 1, yellow: 1 },
          { text: '稳定和环境', blue: 1, green: 2 }
        ]
      },
      {
        question: '你处理问题的方式：',
        options: [
          { text: '快速行动，先做再说', red: 2, yellow: 1 },
          { text: '先分析，再行动', blue: 2, green: 1 }
        ]
      },
      {
        question: '你更喜欢的生活哲学：',
        options: [
          { text: '人生在于拼搏', red: 2, yellow: 1 },
          { text: '平淡才是真', blue: 1, green: 2 }
        ]
      },
      {
        question: '当你得到好消息时，你会：',
        options: [
          { text: '第一时间分享', yellow: 2, red: 1 },
          { text: '自己先高兴一下', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更容易因为什么感动：',
        options: [
          { text: '壮举和成就', red: 1, blue: 1 },
          { text: '温暖和真情', yellow: 1, green: 2 }
        ]
      },
      {
        question: '你的学习方式是：',
        options: [
          { text: '边做边学', red: 1, yellow: 1 },
          { text: '系统学习', blue: 2, green: 1 }
        ]
      },
      {
        question: '你更喜欢结交：',
        options: [
          { text: '很多朋友', yellow: 2, red: 1 },
          { text: '知心朋友', blue: 1, green: 2 }
        ]
      },
      {
        question: '面对规则，你的态度：',
        options: [
          { text: '遵守但会质疑', red: 1, yellow: 1 },
          { text: '遵守并执行', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更喜欢：',
        options: [
          { text: '冒险和刺激', red: 2, yellow: 1 },
          { text: '安全和稳定', blue: 2, green: 1 }
        ]
      },
      {
        question: '当你需要帮助时，你会：',
        options: [
          { text: '直接开口请求', red: 1, yellow: 1 },
          { text: '自己想办法', blue: 1, green: 2 }
        ]
      },
      {
        question: '你的表达方式：',
        options: [
          { text: '直接表达想法', red: 2 },
          { text: '考虑对方感受', blue: 1, green: 1 }
        ]
      },
      {
        question: '你更在意别人的：',
        options: [
          { text: '评价和能力', red: 1, blue: 1 },
          { text: '态度和关系', yellow: 1, green: 2 }
        ]
      },
      {
        question: '当你做计划时，你会：',
        options: [
          { text: '制定详细计划', blue: 2, red: 1 },
          { text: '大致有个方向', yellow: 1, green: 1 }
        ]
      },
      {
        question: '你更容易被说服的方式：',
        options: [
          { text: '有力的逻辑和数据', blue: 2, red: 1 },
          { text: '真诚的情感表达', yellow: 1, green: 2 }
        ]
      }
    ],
    results: {
      types: [
        { color: 'red', name: '红色性格', symbol: '🔥', desc: '你是天生的领导者，充满活力和行动力', detail: '【性格解读】\n红色性格代表行动力、执行力和领导力。你是那种"想到就去做"的人，不喜欢等待和犹豫。\n\n【核心特质】\n• 决策果断：面对选择时，你能够快速做出决定，不喜欢拖泥带水\n• 目标导向：你以结果为导向，注重效率和成果\n• 勇于挑战：你喜欢有难度的工作，迎接挑战让你兴奋\n• 领导才能：你自然地成为团队中的领导者，带动他人前进\n\n【沟通风格】\n你说话直接明了，不喜欢绕弯子。在你看来，时间是最宝贵的资源，所以沟通时总是直奔主题。你可能会让人觉得有些急躁，但这正是你高效的体现。\n\n【情感世界】\n在感情中，你同样是积极的行动派。喜欢一个人你会主动追求，不会错过机会。你需要的是一个能够跟上你节奏、欣赏你活力的伴侣。\n\n【职场优势】\n你适合需要快速决策和带领团队的工作：企业管理者、创业者、销售、项目经理、指挥官。\n\n【成长建议】\n试着放慢脚步，多倾听他人的意见。学会在行动前思考一下，可能会取得更好的效果。', strengths: ['领导力强', '决策果断', '行动力强', '勇于挑战', '效率高'], weaknesses: ['有时急躁', '不够耐心', '可能过于强势', '说话直接'] },
        { color: 'blue', name: '蓝色性格', symbol: '💙', desc: '你是深思熟虑的理性者，追求完美', detail: '【性格解读】\n蓝色性格代表理性、思考和分析。你是那种"三思而后行"的人，重视质量和深度。\n\n【核心特质】\n• 思维缜密：你善于分析问题，考虑周全，不会冲动行事\n• 注重细节：你对质量和精度有很高的要求，追求完美\n• 有计划性：你喜欢提前规划，把事情安排得井井有条\n• 善于思考：你享受独立思考的过程，喜欢探索问题的本质\n\n【沟通风格】\n你说话有条理，喜欢用数据和事实支撑观点。在讨论中，你会仔细分析每一个观点的优缺点。你可能会让人觉得过于挑剔，但这正是你追求完美的体现。\n\n【情感世界】\n在感情中，你比较含蓄，不太擅长表达感情。你需要一个能够理解你内心世界、给你足够思考空间的伴侣。你表达爱意的方式可能是默默付出和细心照顾。\n\n【职场优势】\n你适合需要深度分析和精细执行的工作：科学家、研究员、工程师、财务、分析师、策划。\n\n【成长建议】\n试着接受"不完美"也是美的一种。过度思考可能会让你错失机会，有时候跟随直觉也不错。', strengths: ['思维缜密', '注重细节', '有责任感', '善于分析', '计划性强'], weaknesses: ['有时挑剔', '过度思考', '情感表达不足', '要求过高'] },
        { color: 'yellow', name: '黄色性格', symbol: '💛', desc: '你是充满热情的社交达人，生活因你而精彩', detail: '【性格解读】\n黄色性格代表热情、创意和社交。你是那种"到哪里都是焦点"的人，能够带给周围人快乐和能量。\n\n【核心特质】\n• 乐观积极：你总是看到事物积极的一面，很少被负面情绪困扰\n• 善于社交：你喜欢与人交往，能够轻松与陌生人建立联系\n• 富有创意：你思维活跃，总能想出新奇的想法和点子\n• 激励他人：你有一种天然的感染力，能够带动周围人的情绪\n\n【沟通风格】\n你说话生动有趣，喜欢用故事和例子来表达观点。你的沟通风格充满活力，能够吸引他人的注意力。你可能会让人觉得有些话痨，但这正是你热情的体现。\n\n【情感世界】\n在感情中，你需要浪漫和惊喜。你需要一个能够欣赏你的热情、给你自由空间的伴侣。你表达爱意的方式可能是精心策划的约会和甜蜜的情话。\n\n【职场优势】\n你适合需要创意和社交能力的工作：营销、公关、广告、演艺、教师、培训师。\n\n【成长建议】\n试着更加专注，把创意的火花转化为实际的成果。学会倾听，不要总是主导对话。', strengths: ['乐观积极', '善于交际', '有创意', '激励他人', '充满活力'], weaknesses: ['有时冲动', '不够专注', '可能过于情绪化', '话较多'] },
        { color: 'green', name: '绿色性格', symbol: '💚', desc: '你是温和包容的和平使者，人际关系的润滑剂', detail: '【性格解读】\n绿色性格代表温和、包容和和谐。你是那种"与世无争"的人，总是给人带来舒适和安心的感觉。\n\n【核心特质】\n• 性格温和：你脾气很好，很少与人发生冲突\n• 善于倾听：你愿意倾听他人的故事和烦恼，给人安全感\n• 同理心强：你能够设身处地为他人着想，理解他人的感受\n• 适应力强：你能够很好地适应不同的环境和人际关系\n\n【沟通风格】\n你说话温和，不喜欢与人争论。在交流中，你更愿意做一个倾听者，给人舒适的感觉。你可能会让人觉得没有主见，但这正是你包容的体现。\n\n【情感世界】\n在感情中，你是温柔的伴侣和坚实的后盾。你需要一个能够给你安全感、尊重你空间的伴侣。你表达爱意的方式可能是无微不至的照顾和陪伴。\n\n【职场优势】\n你适合需要人际协调和支持的工作：HR、心理咨询师、护士、教师、服务行业、协调专员。\n\n【成长建议】\n学会表达自己的想法和需求，不要总是迁就他人。适当的时候要学会说"不"。', strengths: ['性格温和', '善于倾听', '有耐心', '善于协调', '包容心强'], weaknesses: ['不够果断', '避免冲突', '可能过于迁就', '缺乏主见'] }
      ]
    }
  },
  // 星座运势测试
  {
    code: 'star',
    name: '星座运势测试',
    description: '12题 · 探索你的星空密码',
    price: 19.9,
    icon: '⭐',
    color: '#F0E5FF',
    paid: 1,
    category: 'fengshui',
    status: 1,
    questions: [
      { question: '你的出生月份是？', options: [{ text: '1-2月（冬季）', star: 1 }, { text: '3-4月（春季）', star: 2 }, { text: '5-6月（夏季）', star: 3 }, { text: '7-8月（夏季）', star: 4 }] },
      { question: '你更喜欢哪种生活方式？', options: [{ text: '规律稳定', star: 1 }, { text: '自由随性', star: 2 }, { text: '充满变化', star: 3 }, { text: '按部就班', star: 4 }] },
      { question: '面对压力时，你会？', options: [{ text: '冷静应对', star: 1 }, { text: '寻求帮助', star: 2 }, { text: '独自承受', star: 3 }, { text: '逃避现实', star: 4 }] },
      { question: '你更看重什么？', options: [{ text: '事业成就', star: 1 }, { text: '感情生活', star: 2 }, { text: '精神追求', star: 3 }, { text: '家庭和谐', star: 4 }] },
      { question: '你的社交风格是？', options: [{ text: '主动外向', star: 1 }, { text: '被动害羞', star: 2 }, { text: '看场合', star: 3 }, { text: '选择性社交', star: 4 }] },
      { question: '你更关注？', options: [{ text: '过去经验', star: 1 }, { text: '当下感受', star: 2 }, { text: '未来可能', star: 3 }, { text: '现实利益', star: 4 }] },
      { question: '做决定时，你更依赖？', options: [{ text: '理性分析', star: 1 }, { text: '直觉感觉', star: 2 }, { text: '他人建议', star: 3 }, { text: '随机应变', star: 4 }] },
      { question: '你最喜欢什么季节？', options: [{ text: '春天', star: 1 }, { text: '夏天', star: 2 }, { text: '秋天', star: 3 }, { text: '冬天', star: 4 }] },
      { question: '你的工作风格是？', options: [{ text: ' leader型', star: 1 }, { text: '团队型', star: 2 }, { text: '独立型', star: 3 }, { text: '稳定型', star: 4 }] },
      { question: '你更容易被什么吸引？', options: [{ text: '外表和能力', star: 1 }, { text: '内在和气质', star: 2 }, { text: '才华和智慧', star: 3 }, { text: '真诚和善良', star: 4 }] },
      { question: '你对待感情的态度？', options: [{ text: '主动追求', star: 1 }, { text: '顺其自然', star: 2 }, { text: '谨慎保守', star: 3 }, { text: '热烈奔放', star: 4 }] },
      { question: '你的消费观念是？', options: [{ text: '节俭储蓄', star: 1 }, { text: '适度消费', star: 2 }, { text: '月光族', star: 3 }, { text: '投资理财', star: 4 }] }
    ],
    results: {
      types: [
        { star: 1, name: '摩羯座/水瓶座', symbol: '♑♒', element: '土/风', desc: '你是务实理性的星座人。', detail: '你性格稳重，追求实际成果。有较强的独立思考能力，不轻易受人影响。事业心强，喜欢按计划行事。2026年对你来说是积累与突破的一年，建议把握机会，勇于尝试新事物。' },
        { star: 2, name: '白羊座/狮子座', symbol: '♈♌', element: '火', desc: '你是热情奔放的星座人。', detail: '你充满活力和热情，喜欢成为焦点。行动力强，敢于尝试新事物。有领导才能，不喜欢被束缚。2026年你的运势上升，适合开展新项目，但要注意控制情绪，三思而后行。' },
        { star: 3, name: '金牛座/处女座', symbol: '♉♍', element: '土', desc: '你是踏实稳重的星座人。', detail: '你注重实际，善于理财。有追求完美的倾向，做事认真负责。2026年财运不错，但要注意身体健康，适当放松。建议多学习新技能，提升竞争力。' },
        { star: 4, name: '双子座/天秤座/射手座', symbol: '♊♎♃', element: '风/火', desc: '你是自由多变的星座人。', detail: '你思维活跃，善于沟通。喜欢新鲜事物，不甘于平庸。2026年人际关系运势上升，适合拓展人脉。但要避免三分钟热度，坚持才能成功。' }
      ]
    }
  },
  // 八字命格测试
  {
    code: 'bazi',
    name: '八字命格分析',
    description: '输入出生信息 · 解读先天命格',
    price: 49.9,
    icon: '🔮',
    color: '#E5FFE5',
    paid: 1,
    category: 'fengshui',
    status: 1,
    questions: [
      { question: '你的出生年份（公历）：', options: [{ text: '1990-1999年', bazi: 1 }, { text: '2000-2009年', bazi: 2 }, { text: '1980-1989年', bazi: 3 }, { text: '其他年份', bazi: 4 }] },
      { question: '你的出生季节：', options: [{ text: '春季（3-5月）', bazi: 1 }, { text: '夏季（6-8月）', bazi: 2 }, { text: '秋季（9-11月）', bazi: 3 }, { text: '冬季（12-2月）', bazi: 4 }] },
      { question: '你出生的时间段：', options: [{ text: '早上（5-11点）', bazi: 1 }, { text: '中午（11-13点）', bazi: 2 }, { text: '下午（13-17点）', bazi: 3 }, { text: '晚上（17-5点）', bazi: 4 }] },
      { question: '你的性格更倾向于：', options: [{ text: '内向稳重', bazi: 1 }, { text: '外向活泼', bazi: 2 }, { text: '理性独立', bazi: 3 }, { text: '感性浪漫', bazi: 4 }] },
      { question: '你做事的态度：', options: [{ text: '稳健谨慎', bazi: 1 }, { text: '积极进取', bazi: 2 }, { text: '灵活变通', bazi: 3 }, { text: '按部就班', bazi: 4 }] },
      { question: '你更看重：', options: [{ text: '事业成就', bazi: 1 }, { text: '感情生活', bazi: 2 }, { text: '家庭和睦', bazi: 3 }, { text: '身心健康', bazi: 4 }] },
      { question: '你的社交方式：', options: [{ text: '广泛社交', bazi: 1 }, { text: '选择性社交', bazi: 2 }, { text: '被动等待', bazi: 3 }, { text: '独处思考', bazi: 4 }] },
      { question: '面对困难时：', options: [{ text: '迎难而上', bazi: 1 }, { text: '求助他人', bazi: 2 }, { text: '暂时回避', bazi: 3 }, { text: '分析解决', bazi: 4 }] }
    ],
    results: {
      types: [
        { bazi: 1, name: '木命人', element: '木', desc: '你是木命人，性格仁慈。', detail: '木命人天生具有生发之气，性格温和善良，有向上进取的心。你适合从事教育、文化、艺术类行业。2026年木气旺盛，你的事业运势上升，但要注意肝胆健康。命中喜用神为水，建议多接触水性事物。' },
        { bazi: 2, name: '火命人', element: '火', desc: '你是火命人，热情洋溢。', detail: '火命人热情开朗，思维活跃，有强烈的表现欲。你适合从事演艺、销售、创业类行业。2026年火气偏旺，注意心血管健康。命中喜用神为木，建议多接触绿色植物。' },
        { bazi: 3, name: '土命人', element: '土', desc: '你是土命人，稳重厚道。', detail: '土命人性格稳重踏实，为人厚道，有责任感。你适合从事管理、金融、农业类行业。2026年土气平稳，财运不错。命中喜用神为火，建议多接触红色事物。' },
        { bazi: 4, name: '金命人', element: '金', desc: '你是金命人，果断刚毅。', detail: '金命人性格刚毅果断，有决断力，善于分析。你适合从事金融、法律、技术类行业。2026年金气旺盛，事业发展顺利。命中喜用神为土，建议多接触陶瓷器物。' }
      ]
    }
  },
  // 职业兴趣测试
  {
    code: 'career',
    name: '职业兴趣测试',
    description: '36题 · 找到适合你的职业方向',
    price: 24.9,
    icon: '💼',
    color: '#E5F0FF',
    paid: 0,
    category: 'career',
    status: 1,
    questions: [
      { question: '你更喜欢的工作环境是？', options: [{ text: '办公室/室内', r: 1 }, { text: '户外/出差', i: 1 }, { text: '灵活多变', a: 1 }, { text: '团队协作', s: 1 }] },
      { question: '你更擅长？', options: [{ text: '分析数据', i: 1 }, { text: '与人沟通', s: 1 }, { text: '创意设计', a: 1 }, { text: '执行操作', r: 1 }] },
      { question: '你更看重工作的？', options: [{ text: '收入和发展', e: 1 }, { text: '兴趣和意义', a: 1 }, { text: '稳定和安全', c: 1 }, { text: '自由和时间', i: 1 }] },
      { question: '遇到问题时，你会？', options: [{ text: '自己思考解决', i: 1 }, { text: '请教他人', s: 1 }, { text: '寻找新方法', a: 1 }, { text: '按规则处理', c: 1 }] },
      { question: '你更喜欢的工作方式是？', options: [{ text: '独立完成', i: 1 }, { text: '团队合作', s: 1 }, { text: '指导他人', e: 1 }, { text: '按计划执行', c: 1 }] },
      { question: '你更喜欢的工作内容？', options: [{ text: '处理数据和文件', c: 1 }, { text: '帮助和服务他人', s: 1 }, { text: '创意和设计', a: 1 }, { text: '管理和领导', e: 1 }] },
      { question: '你更容易被什么激励？', options: [{ text: '成就感和认可', e: 1 }, { text: '创新和自由', a: 1 }, { text: '稳定和保障', c: 1 }, { text: '帮助他人', s: 1 }] },
      { question: '你更喜欢的工作节奏？', options: [{ text: '快节奏有挑战', e: 1 }, { text: '按部就班', c: 1 }, { text: '灵活自由', a: 1 }, { text: '平稳舒适', s: 1 }] },
      { question: '你更关注？', options: [{ text: '结果和效率', e: 1 }, { text: '过程和体验', a: 1 }, { text: '规则和秩序', c: 1 }, { text: '人和关系', s: 1 }] },
      { question: '你更喜欢的工作类型？', options: [{ text: '技术和专业', i: 1 }, { text: '商业和销售', e: 1 }, { text: '艺术和创意', a: 1 }, { text: '服务和教育', s: 1 }] },
      { question: '你处理压力的方式？', options: [{ text: '冷静分析', i: 1 }, { text: '倾诉分享', s: 1 }, { text: '暂时逃避', a: 1 }, { text: '努力克服', e: 1 }] },
      { question: '你对自己的定位是？', options: [{ text: '专家/技术人才', i: 1 }, { text: '领导者/管理者', e: 1 }, { text: '创意人才', a: 1 }, { text: '服务型人才', s: 1 }] }
    ],
    results: {
      types: [
        { type: 'R', name: '实用型', desc: '喜欢动手操作，务实踏实', detail: '【职业类型解读】\n你是典型的实用型人格，喜欢通过实际操作来完成任务，享受动手工作的过程。\n\n【性格特点】\n• 喜欢具体、实际的工作，讨厌抽象的理论\n• 动手能力强，善于操作工具和设备\n• 喜欢户外工作或需要身体活动的工作\n• 务实踏实，重视实际成果\n\n【工作偏好】\n你适合从事需要动手能力、技术技能的工作。你喜欢明确的任务和可操作的工作流程，不喜欢模糊不清的要求。\n\n【推荐职业】\n工程师、技术员、机械师、厨师、摄影师、农业工作者、维修技师、运动员。\n\n【发展建议】\n发挥你动手能力强的优势，在技术领域深耕。如果有兴趣，可以向技术管理方向发展。', careers: ['工程师', '技术员', '机械师', '厨师', '摄影师', '维修技师'] },
        { type: 'I', name: '研究型', desc: '喜欢分析和研究问题', detail: '【职业类型解读】\n你是典型的研究型人格，喜欢独立思考和深入分析问题。\n\n【性格特点】\n• 喜欢独立工作，享受思考的过程\n• 善于分析问题，喜欢探索未知领域\n• 理性客观，注重逻辑和数据\n• 有强烈的好奇心和求知欲\n\n【工作偏好】\n你适合从事需要深度思考和专业知识的科研类工作。你喜欢有足够自由度和挑战性的工作，能够让你深入研究感兴趣的问题。\n\n【推荐职业】\n科学家、研究员、程序员、数据分析师、金融分析师、医生、大学教授。\n\n【发展建议】\n继续发挥你分析能力强的优势，在专业领域深耕。可以考虑往技术专家或学术研究方向发展。', careers: ['科学家', '研究员', '程序员', '数据分析师', '大学教授', '金融分析师'] },
        { type: 'A', name: '艺术型', desc: '有创造力，追求个性表达', detail: '【职业类型解读】\n你是典型的艺术型人格，富有创造力，追求个性化的表达方式。\n\n【性格特点】\n• 富有想象力和创造力，喜欢自由发挥\n• 追求美感和独特性，不喜欢千篇一律\n• 喜欢独立工作，按自己的方式做事\n• 重视自我表达和创意实现\n\n【工作偏好】\n你适合从事需要创造力和艺术感的职业。你不喜欢被束缚，需要足够的创作自由空间。\n\n【推荐职业】\n设计师、作家、艺术家、音乐家、摄影师、创意总监、广告策划。\n\n【发展建议】\n保持你的创意优势，同时学会在商业环境中表达创意。可以考虑往创意总监或独立艺术家方向发展。', careers: ['设计师', '艺术家', '作家', '摄影师', '音乐家', '创意总监'] },
        { type: 'S', name: '社会型', desc: '喜欢帮助他人，人际交往能力强', detail: '【职业类型解读】\n你是典型的社会型人格，喜欢帮助他人，善于与人交往。\n\n【性格特点】\n• 喜欢与人打交道，善于沟通交流\n• 有同理心，愿意帮助他人解决问题\n• 重视人际关系，喜欢团队合作\n• 善于理解和照顾他人感受\n\n【工作偏好】\n你适合从事需要与人交流、服务他人的职业。你在帮助他人的过程中获得成就感和满足感。\n\n【推荐职业】\n教师、心理咨询师、护士、社工、HR、培训师、导游、服务行业。\n\n【发展建议】\n发挥你人际交往能力强的优势，在教育、服务或人力资源领域发展。可以考虑往管理或培训方向发展。', careers: ['教师', '心理咨询师', '护士', '社工', 'HR', '培训师'] },
        { type: 'E', name: '企业型', desc: '有领导力，追求成就', detail: '【职业类型解读】\n你是典型的企业型人格，有强烈的领导欲望和成就动机。\n\n【性格特点】\n• 有领导才能，善于组织和激励团队\n• 追求成功和成就，有强烈的目标导向\n• 喜欢有挑战性的工作，不害怕竞争\n• 善于影响他人，有说服力\n\n【工作偏好】\n你适合从事需要领导能力和商业头脑的职业。你喜欢有挑战性的目标，享受成功带来的成就感。\n\n【推荐职业】\n企业管理者、创业者、销售经理、律师、投资人、政治家、军官。\n\n【发展建议】\n发挥你的领导才能，在商业或管理领域发展。学会平衡目标导向和团队合作，会让你走得更远。', careers: ['企业管理者', '创业者', '销售经理', '投资人', '项目经理', '政治家'] },
        { type: 'C', name: '常规型', desc: '喜欢有条理的工作', detail: '【职业类型解读】\n你是典型的常规型人格，喜欢有组织、有条理的工作环境。\n\n【性格特点】\n• 喜欢按部就班，有明确的工作流程\n• 注重细节，善于处理琐碎的事务\n• 可靠负责，能够严格按照要求完成任务\n• 善于组织和规划，重视效率和准确性\n\n【工作偏好】\n你适合从事需要细心、有条理的职业。你在处理文件和 数据方面有天然的优势。\n\n【推荐职业】\n会计、审计师、行政人员、图书馆员、数据录入、档案管理、质量控制。\n\n【发展建议】\n发挥你细心和条理性强的优势，在财务或行政领域深耕。考虑往专业方向发展，如CPA、审计师等。', careers: ['会计', '审计师', '行政人员', '数据分析师', '质量控制', '档案管理'] }
      ]
    }
  },
  // 情商测试
  {
    code: 'eq',
    name: '情商测试',
    description: '30题 · 测测你的情商有多高',
    price: 19.9,
    icon: '🧡',
    color: '#FFE5E5',
    paid: 0,
    category: 'psychology',
    status: 1,
    questions: [
      { question: '当你生气时，你会？', options: [{ text: '深呼吸，冷静下来', eq: 3 }, { text: '找朋友倾诉', eq: 2 }, { text: '发泄出来', eq: 1 }, { text: '压抑在心里', eq: 0 }] },
      { question: '当你感到压力时，你会？', options: [{ text: '积极寻找解决方案', eq: 3 }, { text: '暂时放松一下', eq: 2 }, { text: '担心焦虑', eq: 1 }, { text: '逃避拖延', eq: 0 }] },
      { question: '当别人批评你时，你会？', options: [{ text: '虚心接受并改进', eq: 3 }, { text: '反思但不一定改', eq: 2 }, { text: '感到沮丧', eq: 1 }, { text: '立即反驳', eq: 0 }] },
      { question: '当你与朋友发生矛盾时，你会？', options: [{ text: '主动沟通解决', eq: 3 }, { text: '等对方先道歉', eq: 2 }, { text: '冷战一段时间', eq: 1 }, { text: '直接绝交', eq: 0 }] },
      { question: '当你取得成绩时，你会？', options: [{ text: '低调庆祝，继续努力', eq: 3 }, { text: '和朋友分享', eq: 2 }, { text: '到处炫耀', eq: 1 }, { text: '觉得自己不够好', eq: 0 }] },
      { question: '当别人取得成绩时，你会？', options: [{ text: '真诚祝福，学习借鉴', eq: 3 }, { text: '有点羡慕', eq: 2 }, { text: '感到嫉妒', eq: 1 }, { text: '贬低对方', eq: 0 }] },
      { question: '当你需要帮助时，你会？', options: [{ text: '主动寻求帮助', eq: 3 }, { text: '看情况', eq: 2 }, { text: '自己硬扛', eq: 1 }, { text: '觉得自己不配', eq: 0 }] },
      { question: '当你安慰别人时，你会？', options: [{ text: '倾听并给出建议', eq: 3 }, { text: '陪伴并安慰', eq: 2 }, { text: '讲道理', eq: 1 }, { text: '不知所措', eq: 0 }] },
      { question: '你经常换位思考吗？', options: [{ text: '经常', eq: 3 }, { text: '有时', eq: 2 }, { text: '很少', eq: 1 }, { text: '从不', eq: 0 }] },
      { question: '你能控制自己的情绪吗？', options: [{ text: '完全能', eq: 3 }, { text: '基本能', eq: 2 }, { text: '偶尔失控', eq: 1 }, { text: '经常失控', eq: 0 }] },
      { question: '当你犯错误时，你会？', options: [{ text: '勇于承认并改正', eq: 3 }, { text: '找借口', eq: 2 }, { text: '逃避责任', eq: 1 }, { text: '责怪他人', eq: 0 }] },
      { question: '你善于表达自己的情感吗？', options: [{ text: '非常善于', eq: 3 }, { text: '还好', eq: 2 }, { text: '不太善于', eq: 1 }, { text: '完全不会', eq: 0 }] }
    ],
    results: {
      ranges: [
        { max: 15, name: '情商偏低', level: '需要提升', desc: '你的情商还有很大提升空间', detail: '【情商解读】\n你的情商目前处于需要提升的阶段，但这并不意味着你无法改变。情商是可以通过学习和练习来提升的。\n\n【情绪管理】\n你可能在面对压力和负面情绪时，还不知道如何有效地处理。容易出现情绪化的反应，或者选择逃避问题。\n\n【人际关系】\n你可能在理解他人感受和处理人际关系方面还有待提高。有时候会忽略他人的情绪，或者不知道如何表达自己的情感。\n\n【提升建议】\n1. 情绪管理：当感到情绪激动时，试着深呼吸，暂停10秒再做反应\n2. 换位思考：在与他人发生冲突时，试着站在对方的角度思考问题\n3. 主动倾听：在别人说话时，不要急于表达自己的观点，先认真听完\n4. 情绪记录：每天记录自己的情绪变化，分析触发情绪的原因\n\n【行动清单】\n• 每天花10分钟进行情绪复盘\n• 每周主动联系一位老朋友\n• 学会说"我理解你的感受"\n• 培养一个缓解压力的兴趣爱好\n\n记住，情商是可以训练的，关键在于持续练习。' },
        { max: 25, name: '情商中等', level: '一般水平', desc: '你的情商处于一般水平', detail: '【情商解读】\n你的情商处于中等水平，已经具备了一些基本的情商技巧，但在某些方面还有提升空间。\n\n【情绪管理】\n你基本能够控制自己的情绪，但在高压情况下可能会有波动。你已经学会了一些情绪调节的方法，但还需要进一步精进。\n\n【人际关系】\n你能够理解他人的感受，但在表达和处理复杂人际关系时还有改进空间。你有自己的社交圈，但可能还需要提升人际关系的深度。\n\n【提升建议】\n1. 深化情绪觉察：学会识别细微的情绪变化，在情绪爆发前及时察觉\n2. 增强同理心：尝试更深入地理解他人的处境和感受\n3. 提升沟通技巧：学会非暴力沟通的表达方式\n4. 建立情感支持系统：与信任的人分享内心感受\n\n【行动清单】\n• 学习非暴力沟通技巧\n• 尝试管理一个团队项目，锻炼领导力\n• 定期进行冥想或正念练习\n• 主动承担一些协调性质的工作\n\n你已经具备了不错的基础，继续练习会让你的情商更上一层楼。' },
        { max: 36, name: '情商较高', level: '优秀', desc: '你的情商比较高', detail: '【情商解读】\n恭喜你！你的情商处于较高的水平。你在情绪管理和人际关系方面都表现得相当出色。\n\n【情绪管理】\n你能够很好地识别和管理自己的情绪。即使在压力情况下，也能保持冷静和理性。你有成熟的情绪调节策略，不容易被情绪左右。\n\n【人际关系】\n你善于理解他人的感受和需求，能够建立深厚的人际关系。你是朋友眼中的"知心人"，大家愿意向你倾诉。你在人际交往中游刃有余，能够恰当处理各种复杂的关系。\n\n【自我认知】\n你对自己有清晰的认识，了解自己的情绪模式和行为习惯。你能够客观地评价自己，不断寻求成长和进步。\n\n【未来发展】\n1. 发挥你的情商优势，在团队管理和人际协调方面发挥更大作用\n2. 尝试更具挑战性的领导岗位\n3. 分享你的情商经验，帮助他人提升\n4. 持续学习，保持情商的持续成长\n\n【行动清单】\n• 承担更多团队协调工作\n• 考虑往管理岗位发展\n• 分享你的经验，帮助朋友提升情商\n• 持续学习心理学和管理学知识\n\n你是高情商人群中的优秀代表，继续发挥你的优势，你会在人生的各个领域都取得成功！' }
      ]
    }
  }
]

// API基础URL（使用代理，相对路径）
const API_BASE = '/api/quiz'

// 从后端API获取数据
async function fetchFromAPI(endpoint) {
  try {
    // 添加时间戳防止缓存
    const timestamp = Date.now()
    const url = `${API_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}_t=${timestamp}`

    // 设置5秒超时
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)

    const result = await response.json()
    if (result.code === 0) {
      return result.data
    }
    return null
  } catch (e) {
    console.error('API请求失败:', e)
    return null
  }
}

// 获取测试列表（对外接口）
// 优化：优先使用本地数据，后台可配置是否从API获取最新数据
export async function getQuizList() {
  // 检查是否需要从API刷新（可通过localStorage配置）
  const needRefresh = localStorage.getItem('quiz_refresh_needed') === '1'

  if (needRefresh) {
    // 尝试从API获取最新数据
    const data = await fetchFromAPI('/all')
    if (data && data.length > 0) {
      localStorage.setItem('quiz_refresh_needed', '0') // 刷新成功后清除标记
      return data
        .filter(q => q.status === 1)
        .map(q => ({
          code: q.code,
          name: q.name,
          description: q.description,
          price: q.price,
          icon: q.icon,
          color: q.color,
          category: q.category,
          questionCount: q.questionCount || q.questions?.length || 0
        }))
    }
  }

  // 优先使用本地默认数据（最稳定，加载最快）
  return quizzes
    .filter(q => q.status !== 0)
    .map(q => ({
      code: q.code,
      name: q.name,
      description: q.description,
      price: q.price,
      icon: q.icon,
      color: q.color,
      category: q.category,
      questionCount: q.questions.length
    }))
}

// 标记需要刷新数据（后台同步后调用）
export function markQuizRefreshNeeded() {
  localStorage.setItem('quiz_refresh_needed', '1')
}

// 根据code获取测试详情
// 优化：优先使用本地数据，避免等待API超时
export async function getQuizByCode(code) {
  // 获取本地quiz作为模板（包含完整的题目结构如scoring）
  const localQuiz = quizzes.find(q => q.code === code)

  // 检查是否需要从API刷新
  const needRefresh = localStorage.getItem('quiz_refresh_needed') === '1'

  if (needRefresh) {
    // 尝试从API获取最新数据
    const allData = await fetchFromAPI('/all')
    if (allData && allData.length > 0) {
      const found = allData.find(q => q.code === code)
      // 如果数据库有题目数据，合并本地模板的题目结构
      if (found && found.questions && found.questions.length > 0) {
        // 合并数据：用数据库的题目数量，但使用本地模板的题目结构(scoring等)
        if (localQuiz && localQuiz.questions) {
          found.questions = found.questions.map((q, idx) => {
            const localQ = localQuiz.questions[idx]
            if (localQ) {
              // 保留本地模板的计分逻辑
              return {
                ...q,
                dimension: localQ.dimension || q.dimension,
                scoring: localQ.scoring,
                // 如果选项没有value，使用本地模板
                options: q.options?.map((opt, optIdx) => ({
                  ...opt,
                  value: opt.value ?? (optIdx + 1)
                })) || localQ.options
              }
            }
            return q
          })
        }
        // 确保有status字段，默认设为1（上架状态）
        if (!found.status) {
          found.status = 1
        }
        // 确保有paid字段
        if (found.paid === undefined) {
          found.paid = localQuiz?.paid || 0
        }
        // 刷新成功后清除标记
        localStorage.setItem('quiz_refresh_needed', '0')
        return found
      }
    }
  }

  // 优先使用本地数据（最稳定，加载最快）
  if (localQuiz) {
    return localQuiz
  }

  return quizzes.find(q => q.code === code)
}

// 同步数据到后端（管理后台使用）
export async function syncQuizzesToServer(quizzes) {
  try {
    const apiKey = import.meta.env.VITE_ADMIN_API_KEY || 'admin-sync-key-2024'
    const response = await fetch(`${API_BASE}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ quizzes })
    })
    const result = await response.json()
    if (result.code === 0) {
      // 同步成功后，标记前台需要刷新数据
      markQuizRefreshNeeded()
      return { success: true, message: result.message }
    }
    return { success: false, message: result.message || '同步失败' }
  } catch (e) {
    console.error('同步失败:', e)
    return { success: false, message: '网络错误' }
  }
}

// 同步所有本地测试到服务器
export async function syncAllQuizzesToServer() {
  return await syncQuizzesToServer(quizzes)
}

// 从后端获取所有数据（管理后台使用）
export async function getAllQuizzesFromServer() {
  const data = await fetchFromAPI('/all')
  return data || []
}

// 计算MBTI结果
export function calculateMBTI(answers, questions) {
  const scores = { e: 0, i: 0, s: 0, n: 0, t: 0, f: 0, j: 0, p: 0 }

  answers.forEach((answerValue, qIndex) => {
    const question = questions[qIndex]
    if (!question || !question.scoring || answerValue === undefined) return

    const answer = question.options[answerValue - 1]
    if (!answer) return

    // 获取对应的分数
    const scoreKey = question.scoring[answerValue]
    if (scoreKey) {
      scores[scoreKey]++
    }
  })

  let result = ''
  result += scores.e >= scores.i ? 'E' : 'I'
  result += scores.s >= scores.n ? 'S' : 'N'
  result += scores.t >= scores.f ? 'T' : 'F'
  result += scores.j >= scores.p ? 'J' : 'P'

  return result
}

// 计算心理年龄结果
export function calculatePsychologicalAge(answers, questions) {
  let totalScore = 0

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question) return
    const answer = question.options[answerIndex]
    if (answer && answer.age !== undefined) {
      totalScore += answer.age
    }
  })

  // 基准心理年龄25岁，加减分数
  const psychologicalAge = 25 + totalScore

  return psychologicalAge
}

// 计算性格色彩结果
export function calculateColor(answers, questions) {
  const scores = { red: 0, blue: 0, yellow: 0, green: 0 }

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question) return
    const answer = question.options[answerIndex]
    if (!answer) return

    if (answer.red) scores.red += answer.red
    if (answer.blue) scores.blue += answer.blue
    if (answer.yellow) scores.yellow += answer.yellow
    if (answer.green) scores.green += answer.green
  })

  // 找出最高分
  const maxScore = Math.max(scores.red, scores.blue, scores.yellow, scores.green)
  const colors = []
  if (scores.red === maxScore) colors.push('red')
  if (scores.blue === maxScore) colors.push('blue')
  if (scores.yellow === maxScore) colors.push('yellow')
  if (scores.green === maxScore) colors.push('green')

  return colors[0] // 返回主色
}

// 计算星座结果
export function calculateStar(answers, questions) {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0 }

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question) return
    const answer = question.options[answerIndex]
    if (answer && answer.star) scores[answer.star]++
  })

  const maxScore = Math.max(scores[1], scores[2], scores[3], scores[4])
  let result = 1
  for (let i = 2; i <= 4; i++) {
    if (scores[i] === maxScore) result = i
  }

  return result
}

// 计算八字结果
export function calculateBazi(answers, questions) {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0 }

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question) return
    const answer = question.options[answerIndex]
    if (answer && answer.bazi) scores[answer.bazi]++
  })

  const maxScore = Math.max(scores[1], scores[2], scores[3], scores[4])
  let result = 1
  for (let i = 2; i <= 4; i++) {
    if (scores[i] === maxScore) result = i
  }

  return result
}

// 计算职业测试结果
export function calculateCareer(answers, questions) {
  const scores = { r: 0, i: 0, a: 0, s: 0, e: 0, c: 0 }

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question) return
    const answer = question.options[answerIndex]
    if (!answer) return
    if (answer.r) scores.r += answer.r
    if (answer.i) scores.i += answer.i
    if (answer.a) scores.a += answer.a
    if (answer.s) scores.s += answer.s
    if (answer.e) scores.e += answer.e
    if (answer.c) scores.c += answer.c
  })

  const maxScore = Math.max(scores.r, scores.i, scores.a, scores.s, scores.e, scores.c)
  const typeMap = { r: 'R', i: 'I', a: 'A', s: 'S', e: 'E', c: 'C' }

  for (const key in scores) {
    if (scores[key] === maxScore) return typeMap[key]
  }

  return 'R'
}

// 计算情商结果
export function calculateEQ(answers, questions) {
  let totalScore = 0

  answers.forEach((answerIndex, qIndex) => {
    if (answerIndex === undefined) return
    const question = questions[qIndex]
    if (!question) return
    const answer = question.options[answerIndex]
    if (answer && answer.eq !== undefined) {
      totalScore += answer.eq
    }
  })

  return totalScore
}
